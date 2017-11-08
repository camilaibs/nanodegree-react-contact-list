import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            contacts: []
        };
        this.handleQuery = this.handleQuery.bind(this);
        this.clearQuery = this.clearQuery.bind(this);
    }

    handleQuery({ target }) {
        this.setState({query: target.value.trim()});
    }

    clearQuery() {
        this.setState({query: ''});
    }

    render() {
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;
        let filteredContacts = contacts;

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            filteredContacts = contacts.filter(({ name }) => match.test(name))
        }

        filteredContacts.sort(sortBy('name'));

        return(
            <div className="list-contacts">
                <div className='list-contacts-top'>
                    <input className="search-contacts" 
                        type="search" 
                        placeholder='Search contacts'
                        value={query} 
                        onChange={this.handleQuery} />
                </div>

                {filteredContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {filteredContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}
                
                <ol className="contact-list">
                    {filteredContacts.map((contact) => (
                        <li className="contact-list-item" key={contact.id}>
                            <div className="contact-avatar" style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }} />
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button className="contact-remove" onClick={() => onDeleteContact(contact)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default ListContacts;