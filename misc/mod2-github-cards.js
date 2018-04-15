import React, { Component, Fragment } from 'react';
// import './App.css';


const Card = (props) => {
  const {
    user: {
      id,
      avatar_url,
      name,
      company,
    },
  } = props;

  return (
    <div style={{ margin: '1em' }}>
      <img src={avatar_url} width="75" />
      <div style={{
        display: 'inline-block',
        marginLeft: 10,
        verticalAlign: 'top',
      }}>
        <div style={{
          fontSize: '1.25em',
          fontWeight: 'bold',
          verticalAlign: 'top',
        }}>
          {name}
        </div>
        {!!company
          ? <div>{company}</div>
          : void 0}
      </div>
    </div>
  );

};
const CardList = (props) => {
  const { users } = props;
  return (
    <Fragment>
      {users.map(user => <Card key={user.id} user={user} />)}
    </Fragment>
  );
};

class Form extends Component {
  state = {
    userName: '',
  };

  handleChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { addUser } = this.props;
    event.preventDefault();
    fetch(`https://api.github.com/users/${this.state.userName}`)
      .then(response => response.json())
      .then(userData => {
        console.log(userData);
        const { id, avatar_url, name, company } = userData;
        addUser({
          id,
          avatar_url,
          name,
          company,
        });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          value={this.state.userName}
          onChange={this.handleChange}
          placeholder="Github username"
          required
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends Component {
  state = {
    users: [
      {
        id: 2886450,
        avatar_url: 'https://avatars1.githubusercontent.com/u/2886450?v=4',
        name: 'Mikal Madsen',
        company: null,
      },
    ],
  };

  addUser = (user) => {
    this.setState((prevState) => ({
      ...prevState,
      users: prevState.users.concat([ user ]),
    }));
  };

  render() {
    return (
      <Fragment>
        <Form addUser={this.addUser} />
        <CardList users={this.state.users} />
      </Fragment>
    );
  }
}

export default App;
