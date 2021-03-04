async function statusRequest(message, messageId, newNumber) {
  let setting = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      id: messageId,
      number: newNumber,
    }),
  };
  try {
    const fetchResponse = await fetch("/story/detail", setting);
    const status = fetchResponse.status;
    if (status != 200) {
      alert("Failed sending request");
    }
  } catch (e) {
    return e;
  }
}
