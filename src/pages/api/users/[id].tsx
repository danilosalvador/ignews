import { NextApiRequest, NextApiResponse } from 'next';

// Exemplo: http://localhost:3000/api/users/1
// Retorno: {"id":"1"}
export default (request: NextApiRequest, response: NextApiResponse) => {
  const params = request.query;
  
  return response.json(params);
}
