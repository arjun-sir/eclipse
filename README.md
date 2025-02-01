# ⛅ Eclipse Weather Dashboard

A modern, responsive weather dashboard built with React that provides real-time weather information and forecasts with a beautiful UI.

![Eclipse Weather Dashboard](screenshot.png)

## ✨ Key Features

- **Real-time Weather Data**: Live weather updates using OpenWeatherMap API
- **5-Day Forecast**: Detailed weather predictions for the next 5 days
- **Efficient Caching**: Implemented with React Query for optimal performance
- **Auto-Refresh**: Automatic data polling every 30 seconds
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Persistent Storage**: Saves user preferences and last searched city
- **Responsive Design**: Beautiful UI that works on all devices
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🚀 Technical Highlights

- **React Query Integration**
  - Efficient data fetching and caching
  - Automatic background updates
  - Optimistic UI updates
  - Built-in error handling

- **Modern React Patterns**
  - Custom hooks for API interactions
  - Context API for state management
  - CSS Modules for styled components
  - Functional components with hooks

- **Performance Optimizations**
  - Debounced API calls
  - Lazy loading components
  - Optimized re-renders
  - Efficient error boundaries

## 🛠️ Built With

- React 18
- React Query
- CSS Modules
- OpenWeatherMap API
- Vite

## 🎯 Core Features

### Weather Information
- Current temperature
- "Feels like" temperature
- Humidity levels
- Wind speed
- Weather conditions with icons
- Location-based weather data

### User Experience
- Clean, intuitive interface
- Smooth animations
- Responsive design
- Dark/light mode support
- Loading states
- Error handling

## 🏃‍♂️ Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/eclipse-weather.git
```

2. **Install dependencies**
```bash
cd eclipse-weather
npm install
```

3. **Set up environment variables**
```bash
# Create a .env file and add your OpenWeatherMap API key
VITE_APP_API_KEY=your_api_key_here
```

4. **Start the development server**
```bash
npm run dev
```

## 🔧 Environment Variables

Required environment variables:
```
VITE_APP_API_KEY=your_openweathermap_api_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather data API
- [React Query](https://tanstack.com/query/latest) for efficient data fetching
- [Inter Font](https://fonts.google.com/specimen/Inter) for typography