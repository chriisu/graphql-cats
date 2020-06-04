import React from 'react'
import { Query } from '@apollo/react-components'
import { gql } from 'apollo-boost'

const App = () => {
  return <CatList />
}

const CATS = gql`
  {
    cats {
      name
      age
      servants {
        name
      }
    }
  }
`

const CatList = () => {
  return (
    <Query query={CATS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error </p>

        return data.cats.map(({ name, age, servants }) => (
          <div key={name}>
            <p>
              {name} is {age} years old and has {servants.length} servants
              {servants.length > 0 && ` (${servants.map(({ name }) => name).join(',')})`}.
            </p>
          </div>
        ))
      }}
    </Query>
  )
}

export default App
