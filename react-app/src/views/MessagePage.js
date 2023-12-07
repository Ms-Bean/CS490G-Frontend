import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Spinner, Alert, Form, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import useInterval from "../hooks/useInterval";
import { Image } from 'react-bootstrap';

const MessagePage = () => {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [SelectedUserRole, setSelectedUserRole] = useState(null);
  const [SelectedUserPicture, setSelectedUserPicture] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedUserMessages, setSelectedUserMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [totalMessagesCount, setTotalMessagesCount] = useState(0);
  const [userRole, setUserRole] = useState(null);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user role and set the state
        const role = await fetchUserRole();
        setUserRole(role);

        // Fetch initial data
        fetchData();

        if (selectedUserId) {
          const UserId = user.user_id;
          // Load the most recent messages on the first page
          fetchUserMessages(UserId, selectedUserId, 1);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the function to fetch user data
    fetchUserData();
  }, [user, selectedUserId]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3500/messages/list", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        const user_id_List = responseData.user_id_List;
        setMessages(user_id_List);

      } else {
        console.error("Error fetching messages list:", response.statusText);
        setError("Error fetching messages");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error");
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();

    const UserId = user.user_id;
    const recipientId = parseInt(selectedUserId, 10);

    if (!Number.isInteger(recipientId) || recipientId <= 0 || newMessageContent.trim() === "") {
      console.error("Invalid recipient id or empty message content");
      setError("Invalid recipient id or empty message content");
      return;
    }

    try {
      const extendedFormData = {
        recipient_id: recipientId,
        content: newMessageContent.trim(),
      };

      const response = await fetch("http://localhost:3500/messages/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(extendedFormData),
      });

      if (response.ok) {
        await fetchUserMessages(UserId, recipientId, currentPage);
        setNewMessageContent("");
      } else {
        console.error("Error sending message:", response.statusText);
        setError("Error sending message");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error");
    }
  };


  const fetchUserRole = async () => {
    try {
      const response = await fetch("http://localhost:3500/get_role", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
      }
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error fetching user role:', error);
      throw error;
    }
  };

  const handleUserClick = async (selectedUserId) => {
    const UserId = user.user_id;
    setSelectedUserId(selectedUserId);
    const selectedUser = messages.find((user) => user.id.id === selectedUserId);
    setSelectedUserName(selectedUser.id.name);
    setSelectedUserRole(selectedUser.role);
    setTotalMessagesCount(selectedUser.id.message_count);
    if (selectedUser.id.profile_picture !== null) {
      setSelectedUserPicture(selectedUser.id.profile_picture);
    } else {
      setSelectedUserPicture('/profilepic.jpg');
    }    
    console.log("Selected User ID:", selectedUserId);
    await fetchUserMessages(UserId, selectedUserId, currentPage);
  };

  const fetchUserMessages = async (userId, otherUserId, page_num) => {
    try {
      const response = await fetch(`http://localhost:3500/messages?user_id=${userId}&other_user_id=${otherUserId}&page_size=5&page_num=${page_num}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        setSelectedUserMessages(responseData.messages.reverse()); // Reverse the array to show the most recent at the bottom
      } else {
        console.error("Error fetching user messages:", response.statusText);
        setError("Error fetching user messages");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error");
    }
  };



  const renderUserList = (role) => {
    const users = messages.filter((user) => user.role === role);
    
    const nameStyle = {
      fontWeight: 'bold',
      marginRight: '10px'
    };
  
    const timeStyle = {
      color: 'gray',
      marginLeft: '10px'
    };
  
    return users.map((user) => {
      const profilePicture = user.id.profile_picture || '/profilepic.jpg'; // Set to static picture when profile_picture is null      const messageDate = new Date(user.id.message_created);
      const messageDate = new Date(user.id.message_created);
      const currentDate = new Date();
      const timeDiff = currentDate - messageDate;
  
      let messageDateDisplay;
      if (timeDiff < 24 * 60 * 60 * 1000) {
        messageDateDisplay = 'Today';
      } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
        const daysAgo = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
        messageDateDisplay = `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
      } else if (timeDiff < 30 * 24 * 60 * 60 * 1000) {
        const weeksAgo = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));
        messageDateDisplay = `${weeksAgo} week${weeksAgo !== 1 ? 's' : ''} ago`;
      } else if (timeDiff < 365 * 24 * 60 * 60 * 1000) {
        const monthsAgo = Math.floor(timeDiff / (30 * 24 * 60 * 60 * 1000));
        messageDateDisplay = `${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
      } else {
        const yearsAgo = Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000));
        messageDateDisplay = `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
      }
  
      return (
        <Button
          key={user.id.id}
          onClick={() => handleUserClick(user.id.id)}
          style={{ background: 'white', margin: '5px', display: 'flex', alignItems: 'center' }}
        >
          <div style={{ marginRight: '20px' }}>
            <img
              src={profilePicture}
              alt="Profile"
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{color: 'black', display: 'flex', alignItems: 'center' }}>{user.id.name}</div>
              <div>&#8226;</div>
              <div style={{color: 'grey', display: 'flex', alignItems: 'center', margin: '3px' }}>•{messageDateDisplay}</div>
            </div>
            <div style={{ color: 'grey', marginLeft: '20px', margin: '3px'  }}>{user.id.message_content}</div>
          </div>
        </Button>
      );
    });
  };
  
  
  const renderClientList = () => {
    const clients = messages.filter((user) => user.role === "client");

    if (clients.length === 0 && userRole === "coach") {
      return (
        <Card className="text-center bg-light">
          <Card.Body>
            <Card.Title>
              <h1>My Clients</h1>
            </Card.Title>
            <p>You don't have any clients</p>
          </Card.Body>
        </Card>
      );
    } else if (clients.length === 0 && userRole === "client") {
      return ;
    }

    return (
      <Card className="text-center bg-light">
        <Card.Body>
          <Card.Title>
            <h1>My Clients</h1>
          </Card.Title>
          <ul>{renderUserList("client")}</ul>
        </Card.Body>
      </Card>
    );
  };

  const renderCoachList = () => {
    const coaches = messages.filter((user) => user.role === "coach");

    if (coaches.length === 0 && userRole === "client") {
      return (
        <Card className="text-center bg-light">
          <Card.Body>
            <Card.Title>
              <h1>Hired Coach</h1>
            </Card.Title>
            <p>You haven't hired any coaches yet.</p>
          </Card.Body>
        </Card>
      );
    } else if (coaches.length === 0 && userRole === "coach") {
      return;
    }

    return (
      <Card className="text-center bg-light">
        <Card.Body>
          <Card.Title>
            <h1>Hired Coach</h1>
          </Card.Title>
          <ul>{renderUserList("coach")}</ul>
        </Card.Body>
      </Card>
    );
  };

  const renderMessages = () => {
    let currentDate = null;


    return selectedUserMessages.map((message, index) => {
      const isCurrentUser = message.sender_id === user.user_id;
      const messageDate = new Date(message.created);
      const formattedDate = messageDate.toLocaleDateString(user.timezone, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });


      let displayDate = null;


      // Display date for the first message and when the day changes
      if (index === 0 || currentDate !== formattedDate) {
        displayDate = (
          <div style={{backgroundColor:'beige', textAlign: 'center', margin: '10px' }}>
            {formattedDate}
          </div>
        );
        currentDate = formattedDate;
      }


      return (
        <React.Fragment key={message.message_id}>
          {displayDate}
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                backgroundColor: isCurrentUser ? 'green' : 'blue',
                color: 'white',
                borderRadius: '10px',
                padding: '8px',
                margin: '5px',
                maxWidth: '70%',
              }}
            >
              {message.content}
              <br />
              <small>
                {messageDate.toLocaleTimeString(user.timezone, {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </small>
            </div>
          </li>
        </React.Fragment>
      );
    });
  };

  const hasMoreMessagesOnNextPage = async () => {
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(`http://localhost:3500/messages?user_id=${user.user_id}&other_user_id=${selectedUserId}&page_size=5&page_num=${nextPage}`, {
        method: "GET",
        credentials: "include",
      });
  
      if (response.ok) {
        const responseData = await response.json();
        return responseData.messages.length > 0;
      } else {
        console.error("Error checking for more messages:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };
  
  const handlePaginationClick = async (direction) => {
    if (direction === 'next') {
      // Check if there are more messages on the next page
      const hasMoreMessages = await hasMoreMessagesOnNextPage();
      if (!hasMoreMessages) {
        return;
      }
    }
  
    // Increment currentPage before fetching messages
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
  
    // Logic for handling pagination, e.g., updating currentPage
    if (direction === 'next') {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  
    // Fetch messages with the new page
    if (selectedUserId) {
      const UserId = user.user_id;
      fetchUserMessages(UserId, selectedUserId, newPage);
    }
  };
  

  const renderPagination = () => {
    const hasNextPage = selectedUserMessages.length === 5; // Adjust this based on your actual page size
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => handlePaginationClick('prev')}
            disabled={currentPage === 1}
          >
            Previous Page
          </Button>
          <span style={{ margin: '0 5px' }}>{currentPage}</span>
          {hasNextPage && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handlePaginationClick('next')}
            >
              Next Page
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (//{SelectedUserRole} can be used to specify who they are talking to but coach to coach messages need fixing
    <Container className="mt-5">
      <Row>
        <Col md={3}>
          {renderCoachList()}
          {renderClientList()}
        </Col>
  
        <Col md={6}>
          <Card className="text-center bg-light">
            <Card.Body>
              <Card.Title>
                {selectedUserId && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Image className="thumbnail-image" roundedCircle src={SelectedUserPicture} alt="Profile Picture" />
                      <div style={{ marginLeft: '10px' }}>{selectedUserName}</div>
                    </div>
                    <hr style={{ margin: '10px 0' }} /> {/* Horizontal line below the title */}
                  </>
                )}
              </Card.Title>
  
              {loading && <Spinner animation="border" />}
              {error && <Alert variant="danger">{error}</Alert>}
              {!loading && !error && (
                <>
                  {selectedUserId ? (
                    <>
                      <div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          {renderMessages()}
                        </ul>
                      </div>
  
                      <div className="pagination">
                        {renderPagination()}
                      </div>
  
                      {/* Horizontal line between messaging box and client/coach boxes */}
                      <hr style={{ margin: '20px 0' }} />
  
                      {/* Messaging Box */}
                      <Form className="mt-3" onSubmit={handleNewMessageSubmit}>
                        <Form.Group controlId="newMessageContent">
                          <Form.Control
                            type="text"
                            placeholder="Type your message..."
                            value={newMessageContent}
                            onChange={(e) => setNewMessageContent(e.target.value)}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Send Message
                        </Button>
                      </Form>
                    </>
                  ) : (
                    <p>Select a user to view and send messages.</p>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  
};
export default MessagePage;