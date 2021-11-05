import { gql } from 'apollo-angular';
export const GET_ALL_STUDENTS = {
  query: gql`
  query{
    getAllStudent{
      id
      firstName
      lastName
      email
      dateOfBirth
    }
  }
  `,
};