<template>
  <div class="movie-item">
    <div class="movie-image">
      <router-link :to="'/movies/' + movie.id">
        <img :src="`/images/movie/${movie.image}`" :alt="movie.name" class="movie-image-content">
      </router-link>
    </div>
    <div class="movie-details">
      <p class="movie-info">{{ movie.score }} | {{ calculate(movie.comments) }} yorum</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    calculate(comments) {
      return comments && Array.isArray(comments) ? comments.length : 0;
    },
  },
};
</script>
<style scoped>
.movie-item {
  width: 250px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.movie-image {
  background-color: #f9f9f9;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.movie-image-content {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.movie-image:hover .movie-image-content {
  transform: scale(1.1);
}

.movie-details {
  padding: 15px;
  text-align: left;
  background-color: #fafafa;
  border-top: 1px solid #eaeaea;
}

.movie-info {
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
}

.movie-info strong {
  color: #333;
}

@media (max-width: 768px) {
  .movie-item {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>