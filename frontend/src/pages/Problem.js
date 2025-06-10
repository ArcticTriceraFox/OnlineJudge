```javascript
const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/run`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ language, code }),
});
```