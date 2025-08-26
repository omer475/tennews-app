import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState(null);
  const [historicalEvents, setHistoricalEvents] = useState([]);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNewsData(data);
        setStories(data.stories || []);
        setHistoricalEvents(data.historicalEvents || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, []);

  const goToStory = (index) => {
    if (index >= 0 && index <= stories.length + 2) {
      setCurrentIndex(index);
    }
  };

  const nextStory = () => {
    if (currentIndex < stories.length + 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    let startY = 0;
    
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY;
      const diff = startY - endY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextStory();
        else prevStory();
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) nextStory();
      else prevStory();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextStory();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        prevStory();
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, stories.length]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading news...</div>
        <style jsx>{styles}</style>
      </div>
    );
  }

  const totalSlides = stories.length + 3; // Opening + 10 stories + History + End

  return (
    <>
      <Head>
        <title>Ten News - Today</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      
      <div className="app">
        <div className="header">
          <div className="date-label">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
          <div className="logo">Ten News</div>
          <div className="profile-icon"></div>
        </div>

        <div className="story-container">
          {/* Opening Card */}
          <div className={`story ${currentIndex === 0 ? 'active' : currentIndex > 0 ? 'prev' : 'next'}`}>
            <div className="content-wrapper opening-card">
              <div className="date-header">{newsData?.date || 'MONDAY, AUGUST 25, 2025'}</div>
              <h1 className="opening-headline">{newsData?.greeting || 'Good morning, today brings important global updates'}</h1>
              <span className="opening-time">{newsData?.readingTime || '2 minute read'}</span>
            </div>
          </div>

          {/* News Stories */}
          {stories.map((story, index) => (
            <div 
              key={story.id} 
              className={`story ${currentIndex === index + 1 ? 'active' : currentIndex > index + 1 ? 'prev' : 'next'}`}
              onClick={() => story.url && window.open(story.url, '_blank')}
            >
              <div className="content-wrapper">
                <div className="article-number-box">{story.id}</div>
                <h1 className="headline">{story.emoji} {story.title}</h1>
                <p className="summary">{story.summary}</p>
              </div>
            </div>
          ))}

          {/* Today in History */}
          <div className={`story ${currentIndex === stories.length + 1 ? 'active' : currentIndex > stories.length + 1 ? 'prev' : 'next'}`}>
            <div className="content-wrapper">
              <div className="history-section">
                <h1 className="history-title">Today in History</h1>
                <div className="history-grid">
                  {historicalEvents.map((event, i) => (
                    <div key={i} className="history-item">
                      <span className="year">{event.year}</span>
                      <span className="event">{event.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* End Card */}
          <div className={`story ${currentIndex === stories.length + 2 ? 'active' : 'prev'}`}>
            <div className="content-wrapper end-card">
              <div className="end-emoji">👋</div>
              <h2 className="end-title">That's all for today, see you tomorrow :)</h2>
              <p className="end-message">Stay informed with Ten News</p>
            </div>
          </div>
        </div>

        <div className="progress-dots">
          {[...Array(totalSlides)].map((_, i) => (
            <div 
              key={i} 
              className={`dot ${currentIndex === i ? 'active' : ''}`}
              onClick={() => goToStory(i)}
            />
          ))}
        </div>

        {currentIndex === 0 && (
          <div className="swipe-hint">Swipe up for next story</div>
        )}

        <style jsx>{styles}</style>
      </div>
    </>
  );
}

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: white;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    color: #666;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    background: rgba(255,255,255,0.94);
    backdrop-filter: blur(20px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    border-bottom: 0.5px solid rgba(0,0,0,0.08);
  }

  .date-label {
    font-size: 15px;
    font-weight: 500;
    color: #86868b;
  }

  .logo {
    font-size: 17px;
    font-weight: 600;
    color: #1d1d1f;
  }

  .profile-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #007AFF, #5856D6);
  }

  .story-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .story {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 120px 24px 80px;
    background: white;
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .story.active {
    transform: translateY(0);
    z-index: 10;
  }

  .story.next {
    transform: translateY(100%);
  }

  .story.prev {
    transform: translateY(-100%);
  }

  .content-wrapper {
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
  }

  .opening-card {
    text-align: center;
  }

  .date-header {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #FF3B30;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  .opening-headline {
    font-size: 56px;
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -2px;
    color: #1d1d1f;
    margin-bottom: 40px;
  }

  .opening-time {
    display: inline-block;
    padding: 12px 24px;
    background: #C6E5F3;
    color: #007AFF;
    border-radius: 980px;
    font-size: 17px;
    font-weight: 500;
  }

  .article-number-box {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: #f5f5f7;
    border-radius: 12px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    font-weight: 600;
    color: #86868b;
    margin-bottom: 24px;
  }

  .headline {
    font-size: 44px;
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -1.2px;
    color: #1d1d1f;
    margin-bottom: 24px;
    text-align: left;
  }

  .summary {
    font-size: 21px;
    line-height: 1.45;
    letter-spacing: -0.3px;
    color: #1d1d1f;
    text-align: left;
  }

  .history-section {
    max-width: 680px;
    width: 100%;
  }

  .history-title {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -1.5px;
    color: #1d1d1f;
    margin-bottom: 40px;
    text-align: center;
  }

  .history-grid {
    display: grid;
    gap: 24px;
  }

  .history-item {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  .year {
    min-width: 80px;
    padding: 8px 16px;
    background: #C6E5F3;
    color: #007AFF;
    border-radius: 100px;
    font-size: 17px;
    font-weight: 700;
    text-align: center;
  }

  .event {
    font-size: 18px;
    line-height: 1.4;
    color: #1d1d1f;
    padding-top: 8px;
  }

  .end-card {
    text-align: center;
  }

  .end-emoji {
    font-size: 64px;
    margin-bottom: 32px;
  }

  .end-title {
    font-size: 36px;
    font-weight: 700;
    color: #1d1d1f;
    margin-bottom: 16px;
  }

  .end-message {
    font-size: 17px;
    color: #86868b;
  }

  .progress-dots {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 100;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: #d2d2d7;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .dot.active {
    width: 28px;
    background: #1d1d1f;
  }

  .swipe-hint {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    color: #86868b;
    animation: pulse 2s ease-in-out infinite;
    z-index: 50;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  @media (max-width: 768px) {
    .opening-headline { font-size: 42px; }
    .headline { font-size: 34px; }
    .summary { font-size: 18px; }
    .history-title { font-size: 36px; }
  }
`;
