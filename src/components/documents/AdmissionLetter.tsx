import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Student } from '@/lib/types';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Times-Roman',
    position: 'relative',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  contact: {
    fontSize: 10,
    color: '#555',
  },
  section: {
    marginBottom: 20,
    lineHeight: 1.5,
  },
  label: {
    fontWeight: 'bold',
  },
  signature: {
    marginTop: 50,
    textAlign: 'right',
  },
  line: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '50%',
    alignSelf: 'flex-end',
  },
  watermark: {
    position: 'absolute',
    fontSize: 60,
    color: '#f0f0f0',
    top: '40%',
    left: '15%',
    transform: 'rotate(-30deg)',
    zIndex: 0,
  },
});

interface AdmissionLetterProp {
  studentInfo: Student;
}

const AdmissionLetter = ({ studentInfo }: AdmissionLetterProp) => {
  const fullName = `${studentInfo.firstName} ${studentInfo.lastName}`;
  const department = studentInfo.departmentName ?? 'N/A';
  const formattedDate = new Date().toLocaleDateString('en-GB');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>UNIVERSITY</Text>

        {/* Logo */}
        <Image src="/logo.png" style={styles.logo} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>University of Excellence</Text>
          <Text style={styles.subTitle}>Office of Admissions</Text>
          <Text style={styles.contact}>
            📍 Nairobi, Kenya | 📞 +254 700 000 000 | 🌐 www.uniexcellence.ac.ke
          </Text>
        </View>

        {/* Greeting & Intro */}
        <View style={styles.section}>
          <Text>Date: {formattedDate}</Text>
          <Text>Dear <Text style={styles.label}>{fullName},</Text></Text>
        </View>

        {/* Admission Details */}
        <View style={styles.section}>
          <Text>
            Congratulations! We are pleased to offer you admission to the <Text style={styles.label}>{department}</Text> department at the University of Excellence.
            Your admission number is <Text style={styles.label}>{studentInfo.admNo}</Text>. Kindly take note of the following details:
          </Text>
        </View>

        {/* Student Details */}
        <View style={styles.section}>
          <Text><Text style={styles.label}>Full Name:</Text> {fullName}</Text>
          <Text><Text style={styles.label}>Admission No:</Text> {studentInfo.admNo}</Text>
          <Text><Text style={styles.label}>National ID:</Text> {studentInfo.nationalId}</Text>
          <Text><Text style={styles.label}>Email:</Text> {studentInfo.email}</Text>
          <Text><Text style={styles.label}>Department:</Text> {department}</Text>
        </View>

        {/* Footer Section */}
        <View style={styles.section}>
          <Text>
            Please report to the admissions office on the scheduled date with all your required documents. We look forward to having you as part of our academic community.
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text>Registrar, Admissions</Text>
          <View style={styles.line} />
        </View>
      </Page>
    </Document>
  );
};

export default AdmissionLetter;
