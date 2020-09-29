import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks'
import Link from "next/link";
import withApollo from '../lib/apolloClient'


const GET_ITEMS = gql`
  query {
    items{
      id
      text
    }
  }
`

const ADD_ITEM = gql`
  mutation addItem($text: String) {
    addItem(text: $text) {
      id
      text
    }
  }
`

const REMOVE_ITEM = gql`
  mutation removeItem($id: ID) {
    removeItem(id: $id)
  }
`

const Client2 = (props) => {

  // debugger
  console.log('CLIENT 2 PROPS', props);

  const onCompleted = (result) => {
    console.log('mutation completed', result)
  }

  const { loading, error, data, fetchMore } = useQuery(GET_ITEMS, {notifyOnNetworkStatusChange: true});
  const [ addItemMutation ] = useMutation(ADD_ITEM, { onCompleted })
  const [ removeItemMutation ] = useMutation(REMOVE_ITEM, { onCompleted })

  const onAddItem = (text) => {
    addItemMutation({
      variables: { text },
      refetchQueries: [{query: GET_ITEMS}],
    })
  }

  const onRemoveItem = (itemId) => {
    removeItemMutation({
      variables: { id: itemId },
      refetchQueries: [{query: GET_ITEMS}],
    })
  }

  if (loading) return <div>Loading...</div>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  if (data?.items) {
    return (
      <>
        {
          data.items.map((item, index) => {
            return (
              <div key={index} className="item">
                <span>
                  <div>{item.text}</div>
                  <div>{item.id}</div>
                </span>
                <span className="btnRemove">
                  <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                </span>
              </div>
            )
          })
        }
        <p><button onClick={() => onAddItem('Item')}>Add Item</button></p>
        <p>
          <Link href="/.netlify/functions/graphql">
            <a>/api/graphql ➡</a>
          </Link>
        </p>
      </>
    );
  }
}
// export default Client2
export default withApollo({ ssr: true })(Client2);
