import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';

const {width: deviceWidth} = Dimensions.get('window');

// Dummy data for rendering cards
const dummyData = Array.from({length: 10}, (item, index) => ({
  id: index.toString(),
  date: `Date ${index + 1}`,
  subject: `Subject ${index + 1}`,
  title: `Title ${index + 1}`,
  description: `Description for item ${index + 1}...`,
  dueDate: `Due Date ${index + 1}`,
  teacher: `Teacher ${index + 1}`,
}));

const HomeWork = () => {
  const [homeworkData, setHomeworkData] = useState([]); // State for homework data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors
  const [jwtToken, setJwtToken] = useState(null); // State to hold JWT token
  const [dashboardData, setDashboardData] = useState(null); // State for dashboard data
  const navigation = useNavigation();

  // URLs
  const loginUrl = 'https://training.edubac.com/api/mobile/login';
  const dashboardUrl =
    'https://training.edubac.com/api/employee/EmployeeDashboardData';
  const homeworkUrl = 'https://training.edubac.com/api/employee/homework/';

  // Login and get JWT token
  const login = async () => {
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'AJITLogin',
          password: '1',
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('result', result);
        setJwtToken(result.token); // Set the JWT token
        fetchDashboardData(result.token); // Fetch dashboard data with the new token
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      console.log('Error logging in:', error);
      setError('Failed to login. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch dashboard data
  const fetchDashboardData = async token => {
    if (!token) return;

    try {
      console.log('Authorization Header:', `Bearer ${token}`); // Log header for debugging

      const response = await fetch(dashboardUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setDashboardData(data);
        console.log('Data', data);
      } else if (data.code === 401) {
        // If token expired, re-login
        console.log('Token expired. Logging in again...');
        login(); // Retry login
      } else {
        throw new Error(data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch homework data using dashboard data
  const fetchHomeworkData = async () => {
    if (!jwtToken || !dashboardData) return;

    const {academicYearId, sectionId, employeeId, classId, subjectId} =
      dashboardData;

    // const url = `${homeworkUrl}?academicyearid=${6}&sectionid=${sectionId}&employeeid=${44}&classid=${classId}&subjectid=${subjectId}&limit=10`;
    const url = `${homeworkUrl}?academicyearid=${6}&employeeid=${44}&limit=1`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Add Authorization header
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setHomeworkData(data.data.assignments); // Set homework data
        console.log('homework data new', data.data.assignments);
      } else if (data.code === 401) {
        // If token expired, re-login
        console.log('Token expired. Logging in again...');
        login(); // Retry login
      } else {
        throw new Error(data.message || 'Failed to fetch homework data');
      }
    } catch (error) {
      console.error('Error fetching homework data:', error);
      setError('Failed to load homework data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle login and data fetching
  useEffect(() => {
    login(); // Perform login
  }, []);

  useEffect(() => {
    if (dashboardData) {
      fetchHomeworkData(); // Fetch homework data after dashboard data is available
    }
  }, [dashboardData]);

  // Render each card
  const renderCard = ({item}) => {
    return (
      <View key={item.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.helloText}>hello</Text>
        </View>
        <TouchableOpacity style={styles.mainContent} activeOpacity={0.8}>
          <View style={styles.cardIcon}>
            <Image
              source={require('../../Assets/Images/math.png')}
              style={styles.iconImage}
            />
            <Text style={styles.subjectText}>{item.subjectname}</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.titleText}>{item.title}</Text>
            {/* <Text style={styles.descriptionText}>{item.description}</Text> */}
            {/* Use RenderHTML to render the HTML content */}
            <RenderHTML
              contentWidth={deviceWidth - 40}
              style={styles.descriptionText}
              source={{
                html: item.description || '<p>No description available.</p>',
              }}
            />

            <View style={styles.dueDateContainer}>
              <Text style={styles.dueDateLabel}>Due Date:</Text>
              <Text style={styles.dueDateText}>
                {item.deadlinedate ? item.deadlinedate : 'NA'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.bottomContent}>
          <View style={styles.userContainer}>
            {item.employeeimage ? (
              <Image style={styles.iconImage2} />
            ) : (
              <Image
                style={styles.iconImage2}
                source={require('../../Assets/Images/avatar-with-bg.png')}
              />
            )}
            <Text style={styles.userName}>
              {item.createdbyname ? item.createdbyname : 'NA'}
            </Text>
          </View>
          <View style={styles.bottomContentSecondChild}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AttachmentScreen', {
                  attachmentArray: item.attachment_array,
                });
              }}>
              <Image
                source={require('../../Assets/Images/attachment.png')}
                style={styles.smallIcon}
              />
            </TouchableOpacity>
            <Image
              source={require('../../Assets/Images/profile.png')}
              style={styles.smallIcon}
            />
            <Image
              source={require('../../Assets/Images/eye.png')}
              style={styles.smallIcon}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        // data={dummyData}
        data={homeworkData}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.mainContainer}
        style={{flexGrow: 1}}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Create Homework');
          console.log('hiiii');
        }}
        style={[
          {
            padding: 5,
            bottom: 20,
            right: 20,
            position: 'absolute',
            backgroundColor: '#fff',

            marginRight: 12,
            textAlign: 'center',
            marginTop: Platform.OS == 'android' ? -4 : 0,
          },
          styles.ComposeBtnContainer,
        ]}>
        <Image
          source={require('../../Assets/Images/Add.png')}
          style={styles.composeIcons}
        />
        <Text style={styles.ComposeBtnTxt}>Add</Text>
      </TouchableOpacity>
    </>
  );
};

export default HomeWork;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    width: '100%',
    marginVertical: 10, // Add some spacing between cards
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#E5F7FE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  helloText: {
    color: '#333',
    fontSize: 14,
  },
  mainContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  cardIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  iconImage2: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  subjectText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    fontWeight: '600',
    color: '#194880',
  },
  description: {
    marginTop: 10,
  },
  titleText: {
    color: '#194880',
    fontWeight: '700',
    fontFamily: 'Nunito-medium',
    marginBottom: 4,
  },
  descriptionText: {
    color: '#333',
    fontFamily: 'SofiaPro-Medium',
    marginBottom: 6,
    lineHeight: 20,
  },
  dueDateContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  dueDateLabel: {
    color: '#FF515D',
    fontWeight: '600',
    fontFamily: 'Nunito-medium',
  },
  dueDateText: {
    color: '#194880',
    fontFamily: 'SofiaPro-Light',
    marginLeft: 4,
  },
  bottomContent: {
    borderTopWidth: 1,
    borderColor: '#E6E9EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 8,
    color: '#333',
    fontSize: 14,
    fontFamily: 'SofiaPro',
  },
  bottomContentSecondChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: 'contain',
  },

  //   btn

  ComposeBtnContainer: {
    height: 43,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',

    shadowColor: Platform.OS === 'android' ? '#33C1F6' : '#33C1F6',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 5,
    shadowRadius: 4,
    shadowOpacity: 5,
    borderRadius: 25,
    borderColor: '#33C1F6',
    borderWidth: 1.5,
  },
  composeIcons: {
    marginLeft: 6,
    tintColor: '#33C1F6',
    height: 20,
    width: 20,
    marginRight: 5,
  },
  ComposeBtnTxt: {
    color: '#33C1F6',
    marginRight: 5,
    fontSize: 19,
  },
});
