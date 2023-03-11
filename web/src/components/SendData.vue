<script setup>
const url = "http://localhost:8000/api/myservice";
const data = { name: "John Doe", email: "john.doe@example.com" };

function sendData() {
  console.log(data);
  // fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error(error));
}
</script>

<template>
  <button @click="sendData">Click</button>
</template>
