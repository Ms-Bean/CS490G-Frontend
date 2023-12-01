// MessagePage.js

import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import CarouselComp from "../components/CarouselComp";
import { useAuth } from "../hooks/useAuth";

const MessagePage = () => {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedUserMessages, setSelectedUserMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
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

    fetchData();
  }, [user]);

  const handleUserClick = async (selectedUserId) => {
    const UserId = user.user_id;
    setSelectedUserId(selectedUserId);
    console.log("Selected User ID:", selectedUserId);
    await fetchUserMessages(UserId, selectedUserId, currentPage);
  };

  const fetchUserMessages = async (userId, otherUserId, page_num) => {
    try {
      const response = await fetch(`http://localhost:3500/messages?user_id=${userId}&other_user_id=${otherUserId}&page_size=10&page_num=${page_num}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        setSelectedUserMessages(responseData.messages);
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
      return <p>No clients to message.</p>;
    }

    return (
      <Card className="text-center bg-light">
        <Card.Body>
          <Card.Title>
            <h1>Client List</h1>
          </Card.Title>
          <ul>{renderUserList("client")}</ul>
        </Card.Body>
      </Card>
    );
  };

  const renderCoachList = () => {
    const coaches = messages.filter((user) => user.role === "coach");

    if (coaches.length === 0) {
      return <p>No coaches to message.</p>;
    }

    return (
      <Card className="text-center bg-light">
        <Card.Body>
          <Card.Title>
            <h1>Coach List</h1>
          </Card.Title>
          <ul>{renderUserList("coach")}</ul>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* Coaches List and Client List stacked on top of each other on the left */}
        <Col md={3}>
          {renderCoachList()}
          {renderClientList()}
        </Col>

        {/* Messaging History on the right */}
        <Col md={6}>
          <Card className="text-center bg-light">
            <Card.Body>
              <Card.Title>
                <h1>Messages</h1>
              </Card.Title>
              {loading && <Spinner animation="border" />}
              {error && <Alert variant="danger">{error}</Alert>}
              {!loading && !error && (
                <>
                  {selectedUserId ? (
                    <>
                      <p>Selected User: {selectedUserId}</p>
                      {selectedUserMessages.length > 0 ? (
                        <div>
                          <h2>Messages:</h2>
                          <ul>
                            {selectedUserMessages.map((message) => (
                              <li key={message.message_id}>
                                {message.content} - {message.created}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p>No messages available.</p>
                      )}
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
