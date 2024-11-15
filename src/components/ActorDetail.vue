<template>
    <div v-if="actor" class="actor-container">
      <div class="actor-header">
        <h1>{{ actor.name }}</h1>
      </div>
      <div class="actor-info">
        <div class="actor-image">
          <img :src="`/images/cast/${actor.image}`" alt="Actor Image" class="actor-img"/>
        </div>
        <div class="actor-details">
          <p><strong>Bio:</strong> {{ actor.bio }}</p>
          <p><strong>Doğum Yılı:</strong> {{ actor.birthdate }}</p>
          <p><strong>Boy:</strong> {{ actor.height }}</p>
        </div>
      </div>
    </div>
    <div v-else class="not-found">
      <p>Actor not found!</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      slug: String,
    },
    data() {
      return {
        actor: null,
      };
    },
    async created() {
      const actorSlug = this.slug;
      try {
        const response = await fetch('http://localhost:3000/movies'); 
        if (!response.ok) {
          throw new Error('Data could not be retrieved');
        }
        const movies = await response.json();
        const movie = movies.find(m => m.cast.some(a => a.slug === actorSlug));
        if (movie) {
          this.actor = movie.cast.find(a => a.slug === actorSlug);
        }
      } catch (error) {
        console.error('Actor data could not be fetched:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  .actor-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #ffffff, #f2f2f2);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.actor-container:hover {
  transform: scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.actor-header {
  text-align: center;
  margin-bottom: 30px;
}

.actor-header h1 {
  font-size: 2.8rem;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  display: inline-block;
  padding-bottom: 5px;
}

.actor-info {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  align-items: flex-start;
}

.actor-image {
  flex: 1;
  max-width: 300px;
  text-align: center;
}

.actor-img {
  width: 100%;
  height: auto;
  border-radius: 15px;
  object-fit: cover;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.actor-img:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.actor-details {
  flex: 2;
  max-width: 500px;
  text-align: left;
  padding: 10px;
}

.actor-details p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #34495e;
}

.actor-details strong {
  color: #2980b9;
}

.not-found {
  text-align: center;
  font-size: 1.8rem;
  color: #e74c3c;
  margin-top: 50px;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .actor-container {
    padding: 20px;
  }

  .actor-info {
    gap: 20px;
  }

  .actor-header h1 {
    font-size: 2.2rem;
  }

  .actor-details p {
    font-size: 1.1rem;
  }
}

  </style>
  