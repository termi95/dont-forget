<template>
  <main>
    <form id="form">
      <h1 class="center">Sign Up</h1>
      <label for="email">Email</label>
      <input id="email" type="text" placeholder="user@email.com" />
      <label for="password">Password </label>
      <input id="password" type="password" placeholder="********" />
      <div class="right">
        <button class="space" type="submit">Login</button>
        <button>
          <router-link to="/register"> Register </router-link>
        </button>
      </div>
    </form>
  </main>
</template>

<style>
@import url(../assets/login.style.css);
</style>

<script setup lang="ts"></script>
