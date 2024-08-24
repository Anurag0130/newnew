// CreateHomework.js
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  setAcademicYear,
  setSelectedClass,
  setSelectedSection,
  setSelectedSubject,
  setSelectedAssignment,
  setTitle,
  setDueDate,
  setDueTime,
  setDescription,
} from '../../Store/Slices/homeworkSlices';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateHomework = () => {
  const dispatch = useDispatch();
  const {
    academicYear,
    selectedClass,
    selectedSection,
    selectedSubject,
    selectedAssignment,
    title,
    dueDate,
    dueTime,
    description,
  } = useSelector(state => state.homework);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(dueDate);
    setShowDatePicker(Platform.OS === 'ios');
    dispatch(setDueDate(currentDate));
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date(dueTime);
    setShowTimePicker(Platform.OS === 'ios');
    dispatch(setDueTime(currentTime));
  };

  const handleSubmit = () => {
    // Handle the form submission here
    console.log('Submitting homework:', {
      academicYear,
      selectedClass,
      selectedSection,
      selectedSubject,
      selectedAssignment,
      title,
      dueDate,
      dueTime,
      description,
    });
  };

  const academicYears = [
    {id: 1, label: 'Year 1', value: 1},
    {id: 2, label: 'Year 2', value: 2},
  ];

  const classes = [
    {id: 1, label: 'Year 1', value: 1},
    {id: 2, label: 'Year 2', value: 2},
  ];
  const sections = [
    {id: 1, label: 'Year 1', value: 1},
    {id: 2, label: 'Year 2', value: 2},
  ];
  const subjects = [
    {id: 1, label: 'Year 1', value: 1},
    {id: 2, label: 'Year 2', value: 2},
  ];
  const assignments = [
    {id: 1, label: 'Year 1', value: 1},
    {id: 2, label: 'Year 2', value: 2},
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Academic Year Dropdown */}
      <View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Academic Year
            <Text style={styles.asterisk}> *</Text>
          </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            labelField="label"
            valueField="value"
            placeholder="Select Year"
            value={academicYear}
            data={academicYears}
            onChange={item => dispatch(setAcademicYear(item.value))}
          />
        </View>

        {/* Class Dropdown */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Class
            <Text style={styles.asterisk}> *</Text>
          </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            labelField="label"
            valueField="value"
            placeholder="Select Class"
            value={selectedClass}
            data={classes}
            onChange={item => dispatch(setSelectedClass(item.value))}
          />
        </View>

        {/* Section Dropdown */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Section
            <Text style={styles.asterisk}> *</Text>
          </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            labelField="label"
            valueField="value"
            placeholder="Select Section"
            value={selectedSection}
            data={sections}
            onChange={item => dispatch(setSelectedSection(item.value))}
          />
        </View>

        {/* Subject Dropdown */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Subject
            <Text style={styles.asterisk}> *</Text>
          </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            labelField="label"
            valueField="value"
            placeholder="Select Subject"
            value={selectedSubject}
            data={subjects}
            onChange={item => dispatch(setSelectedSubject(item.value))}
          />
        </View>

        {/* Assignment Dropdown */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Assignment
            <Text style={styles.asterisk}> *</Text>
          </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            labelField="label"
            valueField="value"
            placeholder="Select Assignment"
            value={selectedAssignment}
            data={assignments}
            onChange={item => dispatch(setSelectedAssignment(item.value))}
          />
        </View>

        {/* Title Input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Title
            <Text style={styles.asterisk}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Title"
            placeholderStyle={styles.textInputPlaceholderStyle}
            value={title}
            onChangeText={text => dispatch(setTitle(text))}
          />
        </View>

        {/* Submission Required Heading */}
        <Text style={styles.submissionHeading}>Submission Required</Text>

        {/* Due Date Picker */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Due Date
            <Text style={styles.asterisk}> *</Text>
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}>
            <Text style={styles.dateText}>
              {dueDate ? dueDate.toDateString() : 'Select Due Date'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Due Time Picker */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Due Time
            <Text style={styles.asterisk}> *</Text>
          </Text>
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={styles.dateButton}>
            <Text style={styles.dateText}>
              {dueTime ? dueTime.toLocaleTimeString() : 'Select Due Time'}
            </Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={dueTime}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>

        {/* Description Input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Minimum 250 words"
            value={description}
            onChangeText={text => dispatch(setDescription(text))}
            multiline
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // flex: 1, // Ensure this is set this is not working but flex grow is work for me
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,

    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  formGroup: {
    marginBottom: 16,
    position: 'relative', // This ensures absolute positioning within the formGroup
  },
  label: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: 20,
    top: -10,
    // marginHorizontal: 4,
    fontSize: 14,
    color: '#00B2F4',
    fontWeight: 'bold',
    zIndex: 2,
    paddingHorizontal: 4,
    fontFamily: 'Nunito-Bold',
  },
  asterisk: {
    color: 'red',
  },
  dropdown: {
    height: 48,
    borderColor: '#70707033',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 20,
    marginBottom: 16,
    zIndex: 1,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'SofiaPro-Medium',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  textInputPlaceholderStyle: {
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderColor: '#70707033',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    textAlignVertical: 'top',
  },
  dateButton: {
    height: 48,
    borderColor: '#70707033',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 16,
    fontFamily:"SofiaPro"
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  submissionHeading: {
    fontSize: 18,
    color: '#194880',
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

export default CreateHomework;
