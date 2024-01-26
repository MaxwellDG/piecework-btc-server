export default `#graphql
  # --------------- CUSTOM SCALARS -----------------
  scalar Date

  # --------------- TYPES -----------------
  type User {
    id: ID
    role: String
  }

  type Company {
    id: ID
    name: String!
    createdAt: Date
    updatedAt: Date
    viewedBySuperAdmin: Boolean
  }

  type Project {
    id: ID
    name: String!
    company: Company
    createdAt: Date
    updatedAt: Date
    viewedBySuperAdmin: Boolean
  }

  type Task {
    id: ID
    name: String
    project: Project
    company: Company
    desc: String
    price: Int
    imageUrls: [String!]
    createdAt: Date
    updatedAt: Date
    viewedBySuperAdmin: Boolean
  }
  # Add messages: IMessage; status: TASK_STATUS; when you do this for real

  # --------------- ENUMS -----------------
  enum ROLE {
    SUPERADMIN
    ADMIN
    USER
  }

  # --------------- UNIONS -----------------
  union PieceOfWork = Project | Task

  # --------------- QUERIES -----------------
  type Query {
    user(id: ID!): User

    users: Users
  }

  # --------------- INPUTS -----------------
  input UserObj {
    id: ID!
    role: ROLE!
  }

  # --------------- INTERFACES -----------------
  interface MutationResponse {
    code: String!
    success: Boolean!
    err: String
  }

  # --------------- MUTATIONS -----------------
  type mutation {
    updateUser(userObj: UserObj): User

    updateUsers(userObjs: [UsersObj]): [User]
  }

  # --------------- MUTATION RESPONSE TYPES -----------------
  type UpdateUserMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }
`;