import { gql } from 'apollo-angular';

const REMOVE_STUDENT = gql`
  mutation removeStudent($id: Float!) {
    removeStudent(id: $id) {
      firstName
      lastName
      email
      dateOfBirth
    }
  }
`;

export default REMOVE_STUDENT;