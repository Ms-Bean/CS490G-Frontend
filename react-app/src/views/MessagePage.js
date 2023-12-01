import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import CarouselComp from "../components/Messaging";
import { useAuth } from "../hooks/useAuth";

const MessagePage = () => {
  const { user } = useAuth();
  const [userList, setUserList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3500/messages/list", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Messages List:", responseData.coachesList);
          setMessages(responseData.coachesList);
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

    // Fetch data when the component mounts
    fetchData();
  }, [user]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    // Additional logic if needed
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* User List on the left */}
        <Col md={3}>
          <Card className="text-center bg-light">
            <Card.Body>
              <Card.Title>
                <h1>User List</h1>
              </Card.Title>
              <ul>
                {userList.map((user) => (
                  <li key={user.user_id} onClick={() => handleUserClick(user.user_id)}>
                    {user.name}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* Messaging History on the right */}
        <Col md={9}>
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
                      <CarouselComp messages={messages} />
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
