import { NextApiRequest, NextApiResponse } from 'next';

// Exemplo: http://localhost:3000/api/users
// Retorno: [{"id":1,"name":"Danilo"}]
export default (request: NextApiRequest, response: NextApiResponse) => {
  const users =[
    { id: 1, name: 'Danilo Salvador' },
  ];

  return response.json(users);
}