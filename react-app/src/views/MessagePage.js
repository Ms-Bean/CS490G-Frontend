import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Spinner, Alert, Form, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import useInterval from "../hooks/useInterval";

const MessagePage = () => {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedUserMessages, setSelectedUserMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [totalMessagesCount, setTotalMessagesCount] = useState(0);

  useInterval(() => {
    fetchData();
  }, 3000); // Fetch messages every 3 seconds

  useEffect(() => {
    fetchData();
    if (selectedUserId) {
      const UserId = user.user_id;
      // Load the most recent messages on the first page
      fetchUserMessages(UserId, selectedUserId, 1);
    }
  }, [user, selectedUserId]);
  

  const isSameDay = (date1, date2) => {
    const formattedDate1 = new Date(date1);
    const formattedDate2 = new Date(date2);

    return (
      formattedDate1.getFullYear() === formattedDate2.getFullYear() &&
      formattedDate1.getMonth() === formattedDate2.getMonth() &&
      formattedDate1.getDate() === formattedDate2.getDate()
    );
  };

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

  const handleUserClick = async (selectedUserId) => {
    const UserId = user.user_id;
    setSelectedUserId(selectedUserId);
    const selectedUser = messages.find((user) => user.id.id === selectedUserId);
    setSelectedUserName(selectedUser.id.name);
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
    return users.map((user) => (
      <li key={user.id.id} onClick={() => handleUserClick(user.id.id)}>
        {user.id.name}
      </li>
    ));
  };

  const renderClientList = () => {
    const clients = messages.filter((user) => user.role === "client");

    if (clients.length === 0) {
      return <p></p>;
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

    if (coaches.length === 0) {
      return <p></p>;
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
    return selectedUserMessages.map((message) => (
      <li
        key={message.message_id}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: message.sender_id === user.user_id ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          style={{
            backgroundColor: message.sender_id === user.user_id ? 'green' : 'blue',
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
            {isSameDay(message.created, new Date()) ? message.created.split(' ')[1] : message.created}
          </small>
        </div>
      </li>
    ));
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
  

  return (
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
                Chatting with {selectedUserName}
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
                    <p>Select a user to view messages.</p>
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
