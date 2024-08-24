import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Button} from 'react-native';

const CheckHomework = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [homeworkData, setHomeworkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jwtToken, setJwtToken] = useState(null); // State to hold JWT token

  // API URLs
  const dashboardUrl =
    'https://training.edubac.com/api/mobile/studentdashboarddata';
  const homeworkUrl = 'https://school.edunext2.com/api/employee/homework';

  // Fetch data from the dashboard API
  const fetchDashboardData = async () => {
    try {
      const response = await fetch(dashboardUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setDashboardData(data);
        console.log('Dashboard Data:', data);
        // Assuming you have a way to get the JWT token here
        setJwtToken('YOUR_JWT_TOKEN'); // Replace with actual JWT token retrieval logic
      } else {
        throw new Error(data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch homework data using data from the dashboard API
  const fetchHomeworkData = async () => {
    if (!jwtToken || !dashboardData) return; // Ensure token and data are available

    const {academicYearId, sectionId, employeeId, classId, subjectId} =
      dashboardData;

    const url = `${homeworkUrl}?academicyearid=${academicYearId}&sectionid=${sectionId}&employeeid=${employeeId}&classid=${classId}&subjectid=${subjectId}&limit=10`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Use the token in the request header
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setHomeworkData(data);
        console.log('Homework Data:', data);
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

  useEffect(() => {
    fetchDashboardData(); // Fetch dashboard data on component mount
  }, []);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Press me "
        onPress={() => {
          navigation.navigate('HomeWork');
        }}
      />
    </View>
  );
};

export default CheckHomework;
