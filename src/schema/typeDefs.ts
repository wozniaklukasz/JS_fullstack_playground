import {gql} from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        id: Int,
        name: String,
        auth_provid: String,
        auth_id: String,
        user_role: String
        created: String
    }

    type Query {
        users: [User]
    }
`;
