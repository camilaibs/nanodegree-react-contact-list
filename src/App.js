import React, { Component } from 'react';
import CreateContact from './CreateContact';
import ListContacts from './ListContacts';
import { getAll, remove, create } from './utils/ContactsAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'list',
      contacts: []
    };
    this.onDeleteContact = this.onDeleteContact.bind(this);
  }

  componentDidMount() {
    getAll().then(contacts => this.setState({ contacts }));
  }

  onContactCreate(contact) {
    create(contact).then(() => {
      this.setState(prev => {
        const contacts = [contact, ...prev.contacts];
        return { contacts };
      });
    });
  }

  onDeleteContact(contact) {
    remove().then(() => {
      this.setState(prev => {
        const contacts = prev.contacts.filter(_ => _.id !== contact.id);
        return { contacts };
      });
    });
  }

  render() {
    const { screen, contacts } = this.state;

    return (
      <div>
        {screen === 'list' && (
          <ListContacts contacts={contacts} onDeleteContact={this.onDeleteContact} />
        )}
        {screen === 'create' && (
          <CreateContact/>
        )}
      </div>
    )
  }
}

export default App;
