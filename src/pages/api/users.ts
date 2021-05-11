import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiResponse, response: NextApiResponse) => {
  const users =[
    { id: 1, name: 'Danilo' },
  ];

  return response.json(users);
}