import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { query as q} from 'faunadb';

import { fauna } from '../../../services/fauna';

// https://next-auth.js.org/getting-started/example
export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user'
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const { email } = user;

      try {
        // Fauna: https://dashboard.fauna.com
        // Configuração:
        // - Criar uma collection: users
        // - Criar um index:
        //  -- Nome: user_by_email
        //  -- Terms: data.email

        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email }}
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email)
              )
            )
          )
        );

        return true;
      } catch {
        return false;
      }
    }
  },
});
