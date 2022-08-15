import React, { useState } from "react";
import { Button, Error, Input, FormField, Label } from "../styles";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err));
      }
    });
  }

  return (
        <form style={{fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'}} onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
          </FormField>
          <FormField>
            <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </FormField>
          <FormField>
            <Button variant="fill" color="primary" type="submit">
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </FormField>
          <FormField>
            {errors? (
              <Error key={errors.error}>{errors.error}</Error>
            ) : null}
          </FormField>
        </form>
  );
}

export default LoginForm;