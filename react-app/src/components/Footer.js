import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div className="text-dark pt-2" style={{ backgroundColor: "#ccd1d4" }}>
        <Container className="text-center d-flex flex-column align-items-center">
          <img src="/logo_moxi.png" alt="logo" style={{ width: "40px", height: "40px" }} className="mb-3 mt-4" />

          <div className="d-flex flex-wrap justify-content-center mt-2 px-4 py-2">
            <a href="/" className="text-decoration-none text-muted m-1 px-3">
              <small>About</small>
            </a>
            <a href="/" className="text-decoration-none text-muted m-1 px-3">
              Team
            </a>
            <a href="/" className="text-decoration-none text-muted m-1 px-3">
              Careers
            </a>
            <a href="/" className="text-decoration-none text-muted m-1 px-3">
              Press
            </a>
          </div>

          <div className="d-flex flex-wrap justify-content-center mt-2 px-4 py-2 my-3">
            <a href="https://github.com/Ms-Bean/CS490G-Frontend/commits/dev" target="_blank" rel="noopener noreferrer" className="m-1 px-2">
              <svg height="24" width="24" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.42-.49-2.58-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.66-.89-3.66-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.88 3.75-3.67 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.56.38C13.71 14.54 16 11.54 16 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </a>
            <a href="https://github.com/Ms-Bean/CS490G-Backend/commits/dev" target="_blank" rel="noopener noreferrer" className="m-1 px-2">
              <svg height="24" width="24" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.42-.49-2.58-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.66-.89-3.66-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.88 3.75-3.67 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.56.38C13.71 14.54 16 11.54 16 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </a>
          </div>
          <div className="d-flex flex-wrap justify-content-center mt-1 pb-4">
            <p className="text-decoration-none text-muted m-1 px-3">
              <small>© 2023 All Rights Reserved</small>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
