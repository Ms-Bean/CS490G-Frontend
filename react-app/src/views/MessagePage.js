import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Spinner, Alert, Form, Button, Navbar } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import useInterval from "../hooks/useInterval";
import { Image } from "react-bootstrap";
import { config } from "./../utils/config";

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
  const [activeUserId, setActiveUserId] = useState(null);
  const [totalMessagesCount, setTotalMessagesCount] = useState(0);
  const [userRole, setUserRole] = useState(null);
  const [SelectedPageInfo, setSelectedPageInfo] = useState({
    page_num: 1,
    page_size: 5,
    page_count: 1,
    has_next: false,
    has_prev: false,
  });

  const buttonStyle = {
    background: "white",
    margin: "5px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderRadius: "10px",
    border: "1px solid #eaeaea", // subtle border
    padding: "10px", // consistent spacing
  };

  const profilePicStyle = {
    width: "100%",
    height: "auto",
    maxWidth: "70px",
    maxHeight: "70px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid white", // subtle border around image
  };

  const messageSectionStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    position: "relative",
    paddingBottom: "60px",
  };

  const messageListStyle = {
    overflowY: "auto",
    flexGrow: 1,
  };

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
        console.error("Error fetching user data:", error);
      }
    };

    // Call the function to fetch user data
    fetchUserData();
  }, [user, selectedUserId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/messages/list`, {
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

  const fetchUserRole = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/get_role`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error: " + response.statusText);
      }
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Error fetching user role:", error);
      throw error;
    }
  };

  const handleUserClick = async (selectedUserId) => {
    const UserId = user.user_id;
    setSelectedUserId(selectedUserId);
    setActiveUserId(selectedUserId);
    const selectedUser = messages.find((user) => user.id.id === selectedUserId);
    setSelectedUserName(selectedUser.id.name);
    setSelectedUserRole(selectedUser.role);
    setTotalMessagesCount(selectedUser.id.message_count);
    if (selectedUser.id.profile_picture !== null) {
      setSelectedUserPicture(selectedUser.id.profile_picture);
    } else {
      setSelectedUserPicture("/profilepic.jpg");
    }
    console.log("Selected User ID:", selectedUserId);
    await fetchUserMessages(UserId, selectedUserId, currentPage);
  };

  const renderUserList = (role) => {
    const users = messages.filter((user) => user.role === role);
  
    const nameStyle = {
      fontWeight: "bold",
      marginRight: "10px",
      color: "black",
    };
  
    const timeStyle = {
      color: "gray",
    };
  
    return users.map((user) => {
      const profilePicture = user.id.profile_picture || '/profilepic.jpg'; // Set to a static picture when profile_picture is null
  
      let messageDateDisplay;
  
      if (user.id.message_created === null) {
        messageDateDisplay = null;
      } else {
        const messageDate = new Date(user.id.message_created);
        const currentDate = new Date();
        const timeDiff = currentDate - messageDate;
  
        // Format the time difference based on different time ranges
        if (timeDiff < 24 * 60 * 60 * 1000) {
          messageDateDisplay = '  Less than a day';
        } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
          const daysAgo = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
          messageDateDisplay = `  ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
        } else if (timeDiff < 30 * 24 * 60 * 60 * 1000) {
          const weeksAgo = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000));
          messageDateDisplay = `  ${weeksAgo} week${weeksAgo !== 1 ? 's' : ''} ago`;
        } else if (timeDiff < 365 * 24 * 60 * 60 * 1000) {
          const monthsAgo = Math.floor(timeDiff / (30 * 24 * 60 * 60 * 1000));
          messageDateDisplay = `  ${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
        } else {
          const yearsAgo = Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000));
          messageDateDisplay = `  ${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
        }
      }
  
      const isSelected = user.id.id === activeUserId;
      const dynamicButtonStyle = {
        ...buttonStyle, // your existing styles
        backgroundColor: isSelected ? "#e9ecef" : "white", // change color if selected
        border: isSelected ? "1px solid #eaeaea" : "1px solid #eaeaea", // change border if selected
      };
  
      return (
        <Button
          key={user.id.id}
          onClick={() => handleUserClick(user.id.id)}
          className="w-100"
          style={dynamicButtonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#f0f0f0'; // Change background color on hover
            e.currentTarget.style.border = '2px solid #3498db'; // Add border on hover
            e.currentTarget.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.1)'; // Add box shadow on hover
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white'; // Revert to the original background color on mouse out
            e.currentTarget.style.border = 'none'; // Remove border on mouse out
            e.currentTarget.style.boxShadow = 'none'; // Remove box shadow on mouse out
          }}
        >
          <div style={{ marginRight: "15px", flex: "0 0 50px" }}>
            <img src={profilePicture} alt="Profile" style={profilePicStyle} />
          </div>
          <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "left", textAlign: "left" }}>
            {/* Align content to the left */}
            <div style={nameStyle}>{user.id.name}</div>
            <div style={{ fontSize: "0.8rem", color: "grey" }}>
              <div>{user.id.message_content}</div>
              <span style={timeStyle}>{messageDateDisplay}</span>
            </div>
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
          <Card.Header>
            <strong>My Clients</strong>
          </Card.Header>
          <Card.Body>
            <Card.Text>You don't have any clients yet</Card.Text>
          </Card.Body>
        </Card>
      );
    } else if (clients.length === 0 && userRole === "client") {
      return;
    }

    return (
      <>
        <strong>Clients</strong>
        {renderUserList("client")}
      </>
    );
  };

  const renderCoachList = () => {
    const coaches = messages.filter((user) => user.role === "coach");

    if (coaches.length === 0 && userRole === "client") {
      return (
        <Card className="text-center">
          <Card.Body>
            <Card.Title>
              <h1>Hired Trainer</h1>
            </Card.Title>
            You haven't hired any trainers yet.
          </Card.Body>
        </Card>
      );
    } else if (coaches.length === 0 && userRole === "coach") {
      return;
    }

    return (
      <>
        <strong>Hired Trainer</strong>
        {renderUserList("coach")}
      </>
    );
  };

  const renderMessages = () => {
    let currentDate = null;

    return selectedUserMessages.map((message, index) => {
      const isCurrentUser = message.sender_id === user.user_id;
      const messageDate = new Date(message.created);
      const formattedDate = messageDate.toLocaleDateString(user.timezone, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      let displayDate = null;

      // Display date for the first message and when the day changes
      if (index === 0 || currentDate !== formattedDate) {
        displayDate = <div style={{ textAlign: "center", margin: "10px" }}>{formattedDate}</div>;
        currentDate = formattedDate;
      }

      return (
        <React.Fragment key={message.message_id}>
          {displayDate}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isCurrentUser ? "flex-end" : "flex-start",
              margin: "5px",
            }}
          >
            <div
              style={{
                backgroundColor: isCurrentUser ? "#0074d9" : "#d8d8d8",
                color: isCurrentUser ? "white" : "black",
                borderRadius: "10px",
                padding: "8px",
                margin: "5px",
                maxWidth: "70%",
              }}
            >
              {message.content}
            </div>
            <small style={{ marginTop: "2px" }}>
              {messageDate.toLocaleTimeString(user.timezone, {
                hour: "numeric",
                minute: "numeric",
              })}
            </small>
          </div>
        </React.Fragment>
      );
    });
  };

  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();

    const UserId = user.user_id;
    const recipientId = parseInt(selectedUserId, 10);

    if (!Number.isInteger(recipientId) || recipientId <= 0) {
      console.error("Invalid recipient id or empty message content");
      setError("Invalid recipient id or empty message content");
      return;
    }
    if (newMessageContent.trim() === "") {
      return;
    }

    try {
      const extendedFormData = {
        recipient_id: recipientId,
        content: newMessageContent.trim(),
      };

      const response = await fetch(`${config.backendUrl}/messages/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(extendedFormData),
      });

      if (response.ok) {
        setNewMessageContent("");
        setCurrentPage(1);
        await fetchUserMessages(UserId, recipientId, 1);
        fetchData();
      } else {
        console.error("Error sending message:", response.statusText);
        setError("Error sending message");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error");
    }
  };

  const fetchUserMessages = async (userId, otherUserId, page_num) => {
    try {
      const response = await fetch(
        `${config.backendUrl}/messages?user_id=${userId}&other_user_id=${otherUserId}&page_size=5&page_num=${page_num}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setSelectedPageInfo({
          page_num: responseData.page_info.page_num,
          page_size: responseData.page_info.page_size,
          page_count: responseData.page_info.page_count,
          has_next: responseData.page_info.has_next,
          has_prev: responseData.page_info.has_prev,
        });
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

  const handlePaginationClick = async (direction) => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;

    // Logic for handling pagination
    if (direction === "next" && SelectedPageInfo.has_next) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && SelectedPageInfo.has_prev) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      return;
    }
    // Fetch messages with the new page
    if (selectedUserId) {
      const UserId = user.user_id;
      fetchUserMessages(UserId, selectedUserId, newPage);
    }
  };

  const renderPagination = () => {
    const hasNextPage = SelectedPageInfo.has_next;
  
    if (!(SelectedPageInfo.has_prev || SelectedPageInfo.has_next)) {
      return null; // Return null instead of an empty function call
    } else {
      return (
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "10px" }}>
          <div>
            {SelectedPageInfo.has_prev && (
              <Button variant="outline-secondary" size="sm" onClick={() => handlePaginationClick("prev")} disabled={currentPage === 1}>
                Newer Messages
              </Button>
            )}
            {/* Display current page and total pages */}
            <span style={{ margin: "0 5px" }}>
              {SelectedPageInfo.page_num} / {SelectedPageInfo.page_count}
            </span>
            {SelectedPageInfo.has_next && (
              <Button variant="outline-secondary" size="sm" onClick={() => handlePaginationClick("next")}>
                Older Messages
              </Button>
            )}
          </div>
        </div>
      );
    }
  };
  
  


  return (
    <>
      <Navbar variant="dark" bg="dark" expand="lg" className="secondary-navbar">
        <Container>
          <Navbar.Brand href="#">Messages</Navbar.Brand>
        </Container>
      </Navbar>
      {userRole === 'admin' && (
        <Container className="mt-4">
          <Card className="my-3">
            <Row>
              <Col md={12} className="message-section-column px-3 py-3">
                <div style={{ textAlign: "center", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p>Admin cannot send messages.</p>
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
      {userRole !== 'admin' && (
        <Container className="mt-4">
          <Card className="my-3">
            <Row>
              <Col md={4} className="user-list-column" style={{ borderRight: "1px solid #D1D1D6", maxHeight: "80vh", overflowY: "auto" }}>
                <div style={{ padding: "10px" }}>
                  {renderCoachList()}
                  {renderClientList()}
                </div>
              </Col>
              <Col md={8} className="message-section-column px-3 py-3">
                {selectedUserId && (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Image className="thumbnail-image" roundedCircle src={SelectedUserPicture} alt="Profile Picture" />
                      <div style={{ marginLeft: "10px", fontWeight: "bold", fontSize: "1.2rem" }}>{selectedUserName}</div>
                    </div>
                    <hr style={{ margin: "10px 0", border: "1px solid black" }} />
                  </>
                )}
                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}
                {!loading && !error && selectedUserId ? (
                  renderMessages()
                ) : (
                  <div style={{ textAlign: "center", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p>Select a user to message.</p>
                  </div>
                )}
                {selectedUserId && (
                  <Form onSubmit={handleNewMessageSubmit} className="mt-2">
                    <Form.Group controlId="newMessageContent" className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Message..."
                        value={newMessageContent}
                        onChange={(e) => setNewMessageContent(e.target.value)}
                        style={{ borderRadius: "10px", border: "1px solid #D1D1D6" }}
                        autoComplete="off"
                      />
                      <Button variant="primary" type="submit" className="mx-2" style={{ borderRadius: "10px" }}>
                        Send
                      </Button>
                    </Form.Group>
                  </Form>
                )}
                {renderPagination()} {/* Include the pagination rendering here */}
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </>
  );
};
  
export default MessagePage;
  