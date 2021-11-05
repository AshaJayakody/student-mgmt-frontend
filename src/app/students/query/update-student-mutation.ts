import { gql } from 'apollo-angular';

const UPDATE_STUDENT = gql`
  mutation updateStudent($updateStudentInput: UpdateStudentInput!) {
    updateStudent(updateStudentInput: $updateStudentInput) {
      id
      firstName
      lastName
      email
      dateOfBirth
    }
  }
  `;

export default UPDATE_STUDENT;