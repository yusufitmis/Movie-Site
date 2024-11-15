<template>
  <div class="container">
    <div class="movie-list">
      <div v-if="loading" class="loading-message">Yükleniyor...</div>
      <div v-if="error" class="error-message">{{ error }}</div>
      <movie-card
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie" 
      />
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [],
      loading: true,
      error: null
    };
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:3000/movies');
      if (!response.ok) {
        throw new Error('Veri alınamadı');
      }
      const data = await response.json();
      this.movies = data;
    } catch (error) {
      console.error("Veri yüklenirken hata oluştu:", error.message);
      this.error = "Filmler yüklenirken bir hata oluştu.";
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  align-items: flex-start;
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 8px;
}

.loading-message {
  color: #666;
  font-weight: 600;
  animation: pulse 1.5s infinite ease-in-out;
}

.error-message {
  color: #e74c3c;
  background-color: #fcebea;
  padding: 15px;
  border-radius: 8px;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@keyframes pulse {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  .movie-list {
    gap: 15px;
  }

  .loading-message,
  .error-message {
    font-size: 16px;
  }
}

</style>
