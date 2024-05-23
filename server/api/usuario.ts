// export default defineEventHandler((event) => {
//   interface User {
//     name: string;
//     photoUrl: string;
//     status: string;
//   }
//   type Users = User[];

  
//   const users: Users = [
//     { name: 'John Doe', photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'active' },
//     { name: 'Jane Smith', photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'inactive' },
//     { name: 'Michael Johnson', photoUrl: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'active' },
//     { name: 'Emily Davis', photoUrl: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'inactive' },
//     { name: 'William Brown', photoUrl: 'https://randomuser.me/api/portraits/men/5.jpg', status: 'active' },
//     { name: 'Olivia Martinez', photoUrl: 'https://randomuser.me/api/portraits/women/6.jpg', status: 'inactive' },
//     { name: 'James Garcia', photoUrl: 'https://randomuser.me/api/portraits/men/7.jpg', status: 'active' },
//     { name: 'Isabella Rodriguez', photoUrl: 'https://randomuser.me/api/portraits/women/8.jpg', status: 'inactive' },
//     { name: 'Alexander Wilson', photoUrl: 'https://randomuser.me/api/portraits/men/9.jpg', status: 'active' },
//     { name: 'Sophia Lee', photoUrl: 'https://randomuser.me/api/portraits/women/10.jpg', status: 'inactive' },
//     { name: 'Daniel Walker', photoUrl: 'https://randomuser.me/api/portraits/men/11.jpg', status: 'active' },
//     { name: 'Mia King', photoUrl: 'https://randomuser.me/api/portraits/women/12.jpg', status: 'inactive' },
//     { name: 'Matthew Harris', photoUrl: 'https://randomuser.me/api/portraits/men/13.jpg', status: 'active' },
//     { name: 'Ava Clark', photoUrl: 'https://randomuser.me/api/portraits/women/14.jpg', status: 'inactive' },
//     { name: 'David Lewis', photoUrl: 'https://randomuser.me/api/portraits/men/15.jpg', status: 'active' },
//     { name: 'Charlotte Robinson', photoUrl: 'https://randomuser.me/api/portraits/women/16.jpg', status: 'inactive' },
//     { name: 'Joseph Young', photoUrl: 'https://randomuser.me/api/portraits/men/17.jpg', status: 'active' },
//     { name: 'Amelia Hall', photoUrl: 'https://randomuser.me/api/portraits/women/18.jpg', status: 'inactive' },
//     { name: 'Andrew Allen', photoUrl: 'https://randomuser.me/api/portraits/men/19.jpg', status: 'active' },
//     { name: 'Evelyn Scott', photoUrl: 'https://randomuser.me/api/portraits/women/20.jpg', status: 'inactive' },
//     { name: 'Benjamin Wright', photoUrl: 'https://randomuser.me/api/portraits/men/21.jpg', status: 'active' },
//     { name: 'Harper Hill', photoUrl: 'https://randomuser.me/api/portraits/women/22.jpg', status: 'inactive' },
//     { name: 'Logan Green', photoUrl: 'https://randomuser.me/api/portraits/men/23.jpg', status: 'active' },
//     { name: 'Ella Adams', photoUrl: 'https://randomuser.me/api/portraits/women/24.jpg', status: 'inactive' },
//     { name: 'Christopher Baker', photoUrl: 'https://randomuser.me/api/portraits/men/25.jpg', status: 'active' },
//     { name: 'Abigail Gonzalez', photoUrl: 'https://randomuser.me/api/portraits/women/26.jpg', status: 'inactive' },
//     { name: 'Jackson Nelson', photoUrl: 'https://randomuser.me/api/portraits/men/27.jpg', status: 'active' },
//     { name: 'Madison Carter', photoUrl: 'https://randomuser.me/api/portraits/women/28.jpg', status: 'inactive' },
//     { name: 'Sebastian Mitchell', photoUrl: 'https://randomuser.me/api/portraits/men/29.jpg', status: 'active' },
//     { name: 'Lily Perez', photoUrl: 'https://randomuser.me/api/portraits/women/30.jpg', status: 'inactive' },
//   ];

//   const usersWithEmail = users.map(user => ({
//     ...user,
//     email: user.name.toLowerCase().replace(/\s+/g, '') + '@example.com'
//   }));

//   return {
//     users: usersWithEmail
//   }
// });

import { defineEventHandler, getQuery, readBody } from 'h3';

let users = [
  { id: 1, name: 'John Doe', photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'active', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Smith', photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'inactive', email: 'janesmith@example.com' },
  // Adicione os demais usuários aqui
];

// Função auxiliar para gerar IDs únicos
const generateId = () => users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const query = getQuery(event);

  if (method === 'GET') {
    if (query.id) {
      const id = Array.isArray(query.id) ? query.id[0] : query.id;
      const user = users.find(u => u.id === parseInt(id));
      return user ? { user } : { error: 'User not found' };
    } else {
      return { users };
    }
  } else {
    const body = await readBody(event);
    switch (method) {
      case 'POST':
        const newUser = {
          id: generateId(),
          ...body
        };
        users.push(newUser);
        return { user: newUser };
      case 'PUT':
        if (query.id) {
          const id = Array.isArray(query.id) ? query.id[0] : query.id;
          const indexToUpdate = users.findIndex(u => u.id === parseInt(id));
          if (indexToUpdate !== -1) {
            users[indexToUpdate] = { ...users[indexToUpdate], ...body };
            return { user: users[indexToUpdate] };
          } else {
            return { error: 'User not found' };
          }
        } else {
          return { error: 'ID is required' };
        }
      case 'DELETE':
        if (query.id) {
          const id = Array.isArray(query.id) ? query.id[0] : query.id;
          const indexToDelete = users.findIndex(u => u.id === parseInt(id));
          if (indexToDelete !== -1) {
            const deletedUser = users.splice(indexToDelete, 1);
            return { user: deletedUser[0] };
          } else {
            return { error: 'User not found' };
          }
        } else {
          return { error: 'ID is required' };
        }
      default:
        return { error: 'Method not allowed' };
    }
  }
});