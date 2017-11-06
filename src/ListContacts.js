import React, { Component } from 'react';

class ListContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            contacts: []
        };
    }

    handleQuery({ target }) {
        this.setState({query: target.value});
    }

    render() {
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;
        let filteredContacts = contacts;

        if (query) {
            // todo;
        }

        return(
            <div className="list-contacts">
                <input className="search-contacts" 
                       type="search" 
                       value={this.state.query} 
                       onChange={this.handleQuery} />
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