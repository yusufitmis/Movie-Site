<template>
  <div class="movie-detail">
    <div v-if="loading" class="loading-message">Yükleniyor...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="movie" class="movie-detail-content">
      <!-- Film Görseli ve Bilgileri -->
      <div class="movie-info-container">
        <div class="movie-image-container">
          <img :src="`/images/movie/${movie.image}`" :alt="movie.name" class="movie-image">
        </div>
        <div class="movie-info">
          <h1>{{ movie.name }}</h1>
          <p><strong>Yıl:</strong> {{ movie.year }}</p>
          <p><strong>Puan:</strong> {{ movie.score }}</p>
          <p><strong>Süre:</strong> {{ movie.time }}</p>
          <p>{{ movie.description }}</p>
        </div>
      </div>

      <!-- Oyuncular -->
      <div class="actor-list">
        <div v-for="actor in movie.cast" :key="actor.slug" class="actor">
          <router-link :to="{ name: 'actorDetail', params: { slug: actor.slug } }">
            <img :src="`/images/cast/${actor.image}`" :alt="actor.name" class="actor-photo">
          </router-link>
          <div class="actor-details">
            <p class="actor-name">{{ actor.name }}</p>
            <p class="actor-character">{{ actor.character }}</p>
          </div>
        </div>
      </div>

      <!-- Yorumlar Slider -->
      <div class="comments" v-if="movie.comments && movie.comments.length">
        <h3>Yorumlar</h3>
        
        <!-- Yorumlar Slider'ı -->
        <div class="comment-slider">
          <div 
            v-for="(comment, index) in movie.comments" 
            :key="index" 
            class="comment-slide" 
            :class="{ 'active': index === currentSlide }"
          >
            <div class="comment-header">
              <strong>{{ comment.title }}</strong>
            </div>
            <p class="comment-description">{{ comment.description }}</p>
          </div>
        </div>
        
        <!-- Slider Navigasyonu -->
        <div class="slider-nav">
          <button @click="prevSlide" class="prev-slide">◀</button>
          <button @click="nextSlide" class="next-slide">▶</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: null,
      loading: true,
      error: null,
      currentSlide: 0
    };
  },
  async mounted() {
    const movieId = (this.$route.params.id);
    try {
      const response = await fetch('http://localhost:3000/movies'); 
      if (!response.ok) {
        throw new Error('Veri alınamadı');
      }
      const movies = await response.json();
      this.movie = movies.find(m => m.id === movieId);  
      if (!this.movie) {
        this.error = 'Film bulunamadı';
      }
    } catch (error) {
      this.error = 'Film verisi alınamadı';
    } finally {
      this.loading = false;
    }

    // Otomatik slider değişimi
    setInterval(this.nextSlide, 5000); // 5 saniye arayla slider'ı otomatik değiştir
  },
  methods: {
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      } else {
        this.currentSlide = this.movie.comments.length - 1;
      }
    },
    nextSlide() {
      if (this.currentSlide < this.movie.comments.length - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0;
      }
    }
  }
};
</script>

<style scoped>
.movie-detail {
  background-color: #f9f9f9;
  padding: 30px;
  font-family: 'Roboto', sans-serif;
}

.movie-detail-content {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.movie-info-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: flex-start;
}

.movie-image-container {
  flex: 1;
  max-width: 450px;
  text-align: center;
  margin-bottom: 20px;
}

.movie-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-image:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.movie-info {
  flex: 2;
  max-width: 650px;
  line-height: 1.8;
}

.movie-info h1 {
  font-size: 2.8em;
  color: #444;
  margin-bottom: 20px;
}

.movie-info p {
  font-size: 1.1em;
  color: #555;
  margin: 10px 0;
}

.actor-list {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.actor {
  text-align: center;
  flex: 0 1 18%;
  min-width: 150px;
}

.actor-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #eaeaea;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.actor-photo:hover {
  transform: scale(1.1);
  border-color: #007bff;
}

.actor-details {
  margin-top: 10px;
}

.actor-name {
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
}

.actor-character {
  font-size: 0.95em;
  color: #777;
}

.comments {
  margin-top: 50px;
  background: linear-gradient(135deg, #f9f9f9, #ececec);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.comments h3 {
  font-size: 2em;
  color: #444;
  margin-bottom: 25px;
  border-bottom: 2px solid #007bff;
  display: inline-block;
  padding-bottom: 5px;
}

.comment-slider {
  position: relative;
  overflow: hidden;
}

.comment-slide {
  display: none;
  transition: opacity 0.5s ease, transform 0.5s ease;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.comment-slide.active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.comment-header {
  font-size: 1.4em;
  color: #333;
  margin-bottom: 15px;
}

.comment-description {
  font-size: 1em;
  color: #555;
  line-height: 1.6;
}

.slider-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.prev-slide,
.next-slide {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.prev-slide:hover,
.next-slide:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .movie-info-container {
    flex-direction: column;
  }

  .movie-image-container,
  .movie-info {
    max-width: 100%;
  }

  .actor {
    flex: 0 1 30%;
  }

  .comments h3 {
    font-size: 1.6em;
  }
}

</style>