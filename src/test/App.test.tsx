import "@testing-library/jest-dom";

import {
  cleanup,
  fireEvent,
  getByText,
  queryByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../App";

const setup = () => {
  const utils = render(<App />);
  return utils;
};

const localStorageMock = (function () {
  let store: any = {};

  return {
    getItem: function (key: any) {
      return store[key] || null;
    },
    setItem: function (key: any, value: any) {
      store[key] = value.toString();
    },
    removeItem: function (key: any) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("test login page", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    setup();
  });

  test("Should have render Login page", async () => {
    const loginHeading = await screen.findByText("Login Notes");
    return expect(loginHeading).toBeInTheDocument();
  });

  test("Should have button login", () => {
    const loginButton = screen.getByText("Login");
    return expect(loginButton).toBeInTheDocument();
  });

  test("should see form login", () => {
    const form = screen.getByLabelText("loginForm");
    return expect(form).toBeInTheDocument();
  });

  test("show error message if login failed", async () => {
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    const loginButton = screen.getByText("Login");

    fireEvent.change(email, { target: { value: "wrong@gmail.com" } });
    fireEvent.change(password, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText("Invalid login credentials");

    return await waitFor(() => expect(errorMessage).toBeInTheDocument());
  });
});

describe("tes note page", () => {
  const login = async () => {
    const email = await screen.findByLabelText("Email");
    const password = await screen.findByLabelText("Password");

    const loginButton = await screen.findByText("Login");

    fireEvent.change(email, {
      target: { value: process.env.REACT_TEST_EMAIL },
    });
    fireEvent.change(password, {
      target: { value: process.env.REACT_TEST_PASSWORD },
    });
    fireEvent.click(loginButton);
  };

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    setup();
    login();
  });

  test("after login should display heading note", async () => {
    const headNote = await screen.findByText(/Note/i);

    expect(headNote).toBeInTheDocument();
  });

  test("should see note form", async () => {
    const form = await screen.findByLabelText("note form");
    expect(form).toBeInTheDocument();
  });

  test("should be able to insert note", async () => {
    const inputTitle = await screen.findByPlaceholderText(
      "Insert Title Note ..."
    );
    const inputNote = await screen.findByPlaceholderText(
      "Insert Note Content ..."
    );

    const submitNote = await screen.findByText("Submit Note");

    fireEvent.change(inputTitle, { target: { value: "title tes" } });

    fireEvent.change(inputNote, { target: { value: "content tes" } });

    fireEvent.click(submitNote);

    const note = await screen.findByText("title tes");
    expect(note).toBeInTheDocument();
  });

  // test("should be able to delete note", async () => {
  //   // eslint-disable-next-line testing-library/no-node-access
  //   await waitForElementToBeRemoved(document.getElementsByClassName("ant-spin-nested-loading"));
      
  //   const note = await screen.findByText("title tes");
  //   const deleteButton = await screen.findByText("Delete");
  //   fireEvent.click(deleteButton);

  //   expect(note).not.toBeInTheDocument();
  // });

  test("should be able to logout", async () => {
    const logoutButton = await screen.findByText(/Log out/i);
    fireEvent.click(logoutButton);
    const loginHeading = await screen.findByText("Login Notes");

    await waitFor(() => expect(loginHeading).toBeInTheDocument());
  });

  afterEach(() => {
    cleanup()
    jest.spyOn(localStorage, "clear");
  });
});
