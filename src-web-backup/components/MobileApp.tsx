import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChatbotDialog } from "./ChatbotDialog";
import { 
  MapPin, 
  Calendar, 
  Home, 
  UtensilsCrossed, 
  Bell, 
  Gamepad2, 
  Trophy, 
  Camera, 
  Navigation,
  DollarSign,
  Star,
  Users,
  Shield,
  Share2,
  Bot,
  Plus,
  Map,
  Compass,
  Wallet,
  User,
  ChevronRight,
  TrendingUp,
  Globe,
  MessageCircle,
  CloudUpload,
  Wifi,
  WifiOff,
  Download,
  UserPlus,
  Lock,
  Sparkles
} from "lucide-react";

type Screen = 'home' | 'explore' | 'trips' | 'budget' | 'profile';

export function MobileApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [lastSyncTime] = useState(new Date());

  const currentTrip = {
    destination: "Paris, France",
    dates: "Dec 15-22, 2024",
    daysLeft: 12,
    budget: 2500,
    spent: 450,
    image: "https://images.unsplash.com/photo-1646494836291-dccc011e3d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHN1bnNldCUyMGJlYWNofGVufDF8fHx8MTc1Nzk1Mjg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };



  const upcomingTrips = [
    {
      destination: "Tokyo, Japan",
      dates: "Jan 10-20, 2025",
      image: "https://images.unsplash.com/photo-1542909356-08e5625abea7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBtYXAlMjBuYXZpZ2F0aW9uJTIwcGhvbmV8ZW58MXx8fHwxNzU3OTUyODY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: "Planning"
    },
    {
      destination: "Swiss Alps",
      dates: "Mar 5-12, 2025",
      image: "https://images.unsplash.com/photo-1615472767332-e5615c7e617a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBoaWtpbmclMjBtb3VudGFpbnxlbnwxfHx8fDE3NTc5NTI4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      status: "Saved"
    }
  ];

  const exploriaChallenges = [
    { title: "Hidden Gem Hunter", progress: 75, points: 150, icon: <Compass className="w-4 h-4" /> },
    { title: "Budget Master", progress: 60, points: 120, icon: <DollarSign className="w-4 h-4" /> },
    { title: "Photo Explorer", progress: 90, points: 200, icon: <Camera className="w-4 h-4" /> },
    { title: "Cultural Connector", progress: 45, points: 80, icon: <Globe className="w-4 h-4" /> }
  ];

  const renderHomeScreen = () => (
    <div className="relative z-10 p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 leading-tight" style={{ color: '#FEFEE3' }}>
            Discover
          </h1>
          <h2 className="text-4xl font-light" style={{ color: 'rgba(254, 254, 227, 0.8)' }}>Amazing Places</h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#4C956C' }}></div>
            <p className="text-sm font-medium" style={{ color: '#4C956C' }}>Live Weather & Updates</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-3 backdrop-blur-xl border rounded-2xl transition-all hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(254, 254, 227, 0.1)', 
              borderColor: 'rgba(254, 254, 227, 0.2)',
              color: '#FEFEE3'
            }}
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Featured Adventure Card */}
      <div className="relative backdrop-blur-xl rounded-3xl p-8 overflow-hidden border shadow-2xl" 
           style={{ 
             background: `linear-gradient(135deg, rgba(255, 201, 185, 0.9), rgba(214, 140, 69, 0.9))`,
             borderColor: 'rgba(254, 254, 227, 0.2)'
           }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(254, 254, 227, 0.1)' }}></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-xl" style={{ backgroundColor: 'rgba(44, 110, 73, 0.2)' }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5" style={{ color: '#D68C45' }} />
            <p className="text-sm font-medium" style={{ color: 'rgba(44, 110, 73, 0.9)' }}>Premium Experience</p>
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: '#2C6E49' }}>Unlock Exclusive</h3>
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#2C6E49' }}>Travel Destinations</h3>
          <Button 
            className="rounded-2xl px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            style={{ 
              backgroundColor: '#2C6E49', 
              color: '#FEFEE3',
              border: 'none'
            }}
          >
            Start Journey
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="backdrop-blur-xl rounded-2xl border p-4" 
             style={{ 
               backgroundColor: 'rgba(254, 254, 227, 0.1)', 
               borderColor: 'rgba(254, 254, 227, 0.2)' 
             }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(76, 149, 108, 0.2)' }}>
              <MapPin className="w-5 h-5" style={{ color: '#FEFEE3' }} />
            </div>
            <div className="flex-1">
              <input 
                placeholder="Where would you like to go?"
                className="w-full bg-transparent text-lg font-medium focus:outline-none"
                style={{ 
                  color: '#FEFEE3',
                  '::placeholder': { color: 'rgba(254, 254, 227, 0.6)' }
                }}
              />
            </div>
            <Button 
              className="rounded-xl px-6 py-2 font-medium shadow-lg hover:scale-105 transition-all"
              style={{ 
                background: `linear-gradient(135deg, #4C956C, #2C6E49)`,
                color: '#FEFEE3',
                border: 'none'
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Sync Status */}
      <div className="backdrop-blur-xl rounded-2xl border p-4" 
           style={{ 
             backgroundColor: 'rgba(254, 254, 227, 0.1)', 
             borderColor: 'rgba(254, 254, 227, 0.2)' 
           }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isOfflineMode ? (
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(214, 140, 69, 0.2)' }}>
                <WifiOff className="w-5 h-5" style={{ color: '#D68C45' }} />
              </div>
            ) : (
              <div className="p-2 rounded-xl" style={{ backgroundColor: 'rgba(76, 149, 108, 0.2)' }}>
                <CloudUpload className="w-5 h-5" style={{ color: '#4C956C' }} />
              </div>
            )}
            <div>
              <p className="font-medium" style={{ color: '#FEFEE3' }}>
                {isOfflineMode ? 'Offline Mode Active' : 'All Data Synced'}
              </p>
              <p className="text-sm" style={{ color: 'rgba(254, 254, 227, 0.6)' }}>
                Last sync: {lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className="border rounded-xl hover:scale-105 transition-all"
            style={{ 
              backgroundColor: 'rgba(254, 254, 227, 0.1)', 
              borderColor: 'rgba(254, 254, 227, 0.2)',
              color: '#FEFEE3'
            }}
          >
            {isOfflineMode ? <Wifi className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#FEFEE3' }}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { 
              icon: <Navigation className="w-6 h-6" />, 
              label: "Navigation", 
              bgColor: '#4C956C',
              iconColor: '#FEFEE3'
            },
            { 
              icon: <Camera className="w-6 h-6" />, 
              label: "Travel Journal", 
              bgColor: '#FFC9B9',
              iconColor: '#2C6E49'
            },
            { 
              icon: <Users className="w-6 h-6" />, 
              label: "Local Guides", 
              bgColor: '#D68C45',
              iconColor: '#FEFEE3'
            },
            { 
              icon: <Shield className="w-6 h-6" />, 
              label: "Travel Safety", 
              bgColor: '#2C6E49',
              iconColor: '#FEFEE3'
            }
          ].map((action, index) => (
            <div 
              key={index}
              className="backdrop-blur-xl rounded-2xl p-6 border cursor-pointer group hover:scale-105 transition-all"
              style={{ 
                backgroundColor: 'rgba(254, 254, 227, 0.1)', 
                borderColor: 'rgba(254, 254, 227, 0.2)' 
              }}
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg"
                style={{ backgroundColor: action.bgColor }}
              >
                <span style={{ color: action.iconColor }}>{action.icon}</span>
              </div>
              <h4 className="font-semibold" style={{ color: '#FEFEE3' }}>{action.label}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Destinations */}
      <div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#FEFEE3' }}>Trending Destinations</h3>
        <div className="grid grid-cols-2 gap-4">
          {upcomingTrips.map((trip, index) => (
            <div 
              key={index} 
              className="backdrop-blur-xl rounded-2xl border overflow-hidden group hover:scale-105 transition-all"
              style={{ 
                backgroundColor: 'rgba(254, 254, 227, 0.1)', 
                borderColor: 'rgba(254, 254, 227, 0.2)' 
              }}
            >
              <div className="relative">
                <div className="w-full h-32 overflow-hidden">
                  <ImageWithFallback 
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full backdrop-blur-sm p-0 border transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: 'rgba(255, 201, 185, 0.2)', 
                    borderColor: 'rgba(254, 254, 227, 0.3)' 
                  }}
                >
                  <Star className="w-4 h-4" style={{ color: '#D68C45' }} />
                </Button>
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-bold text-sm" style={{ color: '#FEFEE3' }}>{trip.destination}</h3>
                  <p className="text-xs" style={{ color: 'rgba(254, 254, 227, 0.8)' }}>{trip.dates}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold" style={{ color: '#FEFEE3' }}>${Math.floor(Math.random() * 500 + 200)}</p>
                  <Badge 
                    className="border-0 text-sm px-3 py-1 rounded-full"
                    style={{ 
                      backgroundColor: '#FFC9B9', 
                      color: '#2C6E49'
                    }}
                  >
                    {trip.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExploreScreen = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Exploria</h2>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold">1,250 pts</span>
        </div>
      </div>

      {/* Level Progress */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold">Explorer Level 12</h3>
            <p className="text-sm text-muted-foreground">Next level in 350 points</p>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
            Level 12
          </Badge>
        </div>
        <Progress value={75} className="h-2" />
      </Card>

      {/* Active Challenges */}
      <div>
        <h3 className="font-semibold mb-3">Active Challenges</h3>
        <div className="space-y-3">
          {exploriaChallenges.map((challenge, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                  {challenge.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{challenge.title}</h4>
                  <p className="text-sm text-muted-foreground">{challenge.points} points</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{challenge.progress}%</p>
                </div>
              </div>
              <Progress value={challenge.progress} className="h-2" />
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h3 className="font-semibold mb-3">Recent Achievements</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: "First Check-in", icon: <MapPin className="w-4 h-4" />, earned: "2 days ago" },
            { title: "Budget Saver", icon: <DollarSign className="w-4 h-4" />, earned: "1 week ago" },
            { title: "Photo Pro", icon: <Camera className="w-4 h-4" />, earned: "2 weeks ago" }
          ].map((achievement, index) => (
            <Card key={index} className="p-3 text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mx-auto mb-2">
                {achievement.icon}
              </div>
              <h4 className="text-xs font-medium mb-1">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground">{achievement.earned}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Friends Leaderboard</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="space-y-2">
          {[
            { name: "Sarah Chen", points: 1520, rank: 1 },
            { name: "You", points: 1250, rank: 2 },
            { name: "Mike Johnson", points: 980, rank: 3 }
          ].map((user, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                user.rank === 1 ? 'bg-yellow-500 text-white' : 
                user.rank === 2 ? 'bg-gray-300 text-gray-700' : 
                'bg-orange-400 text-white'
              }`}>
                {user.rank}
              </div>
              <Avatar className="w-8 h-8">
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{user.name}</p>
              </div>
              <div className="text-sm font-semibold">{user.points} pts</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderTripsScreen = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Trips</h2>
        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-1" />
          Plan Trip
        </Button>
      </div>

      {/* Trip Planning Tools */}
      <div>
        <h3 className="font-semibold mb-3">Planning Tools</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Navigation className="w-5 h-5" />, title: "Smart Route", desc: "AI-powered navigation" },
            { icon: <Calendar className="w-5 h-5" />, title: "Itinerary Builder", desc: "Personalized schedules" },
            { icon: <Home className="w-5 h-5" />, title: "Find Stays", desc: "Budget to luxury options" },
            { icon: <UtensilsCrossed className="w-5 h-5" />, title: "Food", desc: "Local dining spots" }
          ].map((tool, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  {tool.icon}
                </div>
                <h4 className="font-medium text-sm">{tool.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Current Trip Details */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Current Trip: Paris</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Itinerary</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Bookmarks</span>
            </div>
            <Badge variant="outline">12 places</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Travel Companions</span>
            </div>
            <Badge variant="outline">3 people</Badge>
          </div>
        </div>
      </Card>

      {/* Trip History */}
      <div>
        <h3 className="font-semibold mb-3">Recent Trips</h3>
        <div className="space-y-3">
          {[
            { destination: "Barcelona, Spain", dates: "Sep 2024", rating: 5 },
            { destination: "Amsterdam, Netherlands", dates: "Jul 2024", rating: 4 },
            { destination: "Prague, Czech Republic", dates: "May 2024", rating: 5 }
          ].map((trip, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{trip.destination}</h4>
                  <p className="text-sm text-muted-foreground">{trip.dates}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(trip.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBudgetScreen = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Budget Tracker</h2>
      </div>

      {/* Detailed Budget Summary */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <h3 className="font-semibold mb-4 text-center">Paris Trip Budget</h3>
        <div className="space-y-6">
          {/* Budget Overview */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/70 rounded-lg p-3">
              <p className="text-2xl font-bold text-blue-600">${currentTrip.budget}</p>
              <p className="text-xs text-muted-foreground">Total Budget</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-600">${currentTrip.spent}</p>
              <p className="text-xs text-muted-foreground">Spent</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <p className="text-2xl font-bold text-purple-600">${currentTrip.budget - currentTrip.spent}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Budget Progress</span>
              <span>{Math.round((currentTrip.spent / currentTrip.budget) * 100)}%</span>
            </div>
            <Progress value={(currentTrip.spent / currentTrip.budget) * 100} className="h-3" />
          </div>
          
          {/* Daily Average */}
          <div className="flex justify-between items-center bg-white/50 rounded-lg p-3">
            <span className="text-sm">Daily average so far</span>
            <span className="font-semibold">${Math.round(currentTrip.spent / 3)}</span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12 border-2 hover:bg-gray-50">
          <Plus className="w-5 h-5 mr-2" />
          Add Manually
        </Button>
        <Button className="h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Camera className="w-5 h-5 mr-2" />
          Scan Receipt
        </Button>
      </div>

      {/* Detailed Expense Breakdown */}
      <div>
        <h3 className="font-semibold mb-4">Expense Breakdown by Category</h3>
        <div className="space-y-4">
          {[
            { category: "Accommodation", amount: 180, budget: 800, icon: <Home className="w-5 h-5" />, color: "bg-blue-50 text-blue-600", bgColor: "bg-blue-500" },
            { category: "Food & Dining", amount: 150, budget: 600, icon: <UtensilsCrossed className="w-5 h-5" />, color: "bg-orange-50 text-orange-600", bgColor: "bg-orange-500" },
            { category: "Transportation", amount: 80, budget: 400, icon: <Navigation className="w-5 h-5" />, color: "bg-green-50 text-green-600", bgColor: "bg-green-500" },
            { category: "Activities", amount: 40, budget: 500, icon: <Camera className="w-5 h-5" />, color: "bg-purple-50 text-purple-600", bgColor: "bg-purple-500" }
          ].map((expense, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-full ${expense.color} flex items-center justify-center`}>
                  {expense.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold">{expense.category}</h4>
                    <span className="text-sm font-medium">{Math.round((expense.amount / expense.budget) * 100)}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>${expense.amount} of ${expense.budget}</span>
                    <span>${expense.budget - expense.amount} left</span>
                  </div>
                </div>
              </div>
              <Progress value={(expense.amount / expense.budget) * 100} className="h-2" />
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Transactions</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="space-y-3">
          {[
            { description: "Hotel Le Marais", amount: 120, category: "Accommodation", date: "Dec 10", time: "14:30", icon: <Home className="w-4 h-4" />, color: "text-blue-600" },
            { description: "Café de Flore", amount: 28, category: "Food", date: "Dec 10", time: "12:15", icon: <UtensilsCrossed className="w-4 h-4" />, color: "text-orange-600" },
            { description: "Metro Pass", amount: 15, category: "Transport", date: "Dec 9", time: "09:45", icon: <Navigation className="w-4 h-4" />, color: "text-green-600" },
            { description: "Louvre Museum", amount: 17, category: "Activities", date: "Dec 9", time: "10:30", icon: <Camera className="w-4 h-4" />, color: "text-purple-600" },
            { description: "Boulangerie Patisserie", amount: 12, category: "Food", date: "Dec 8", time: "08:20", icon: <UtensilsCrossed className="w-4 h-4" />, color: "text-orange-600" },
            { description: "Taxi to Airport", amount: 35, category: "Transport", date: "Dec 8", time: "06:00", icon: <Navigation className="w-4 h-4" />, color: "text-green-600" },
            { description: "Seine River Cruise", amount: 25, category: "Activities", date: "Dec 7", time: "16:00", icon: <Camera className="w-4 h-4" />, color: "text-purple-600" }
          ].map((transaction, index) => (
            <Card key={index} className="p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${transaction.color}`}>
                  {transaction.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{transaction.description}</h4>
                  <p className="text-xs text-muted-foreground">{transaction.category} • {transaction.date} at {transaction.time}</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold">${transaction.amount}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Smart Budget Tip */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-600" />
          Smart Budget Tip
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          You're 18% under budget for food! Consider trying a Michelin-starred restaurant for a special dinner.
        </p>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">On Track</Badge>
          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Under Budget</Badge>
        </div>
      </Card>
    </div>
  );

  const renderProfileScreen = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-3">
          <AvatarImage src="/api/placeholder/80/80" />
          <AvatarFallback>AT</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">Alex Thompson</h2>
        <p className="text-sm text-muted-foreground">Wanderlust Explorer • Level 12</p>
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="text-center">
            <div className="font-bold">24</div>
            <div className="text-xs text-muted-foreground">Countries</div>
          </div>
          <div className="text-center">
            <div className="font-bold">1,250</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </div>
          <div className="text-center">
            <div className="font-bold">48</div>
            <div className="text-xs text-muted-foreground">Badges</div>
          </div>
        </div>
      </div>

      {/* Quick Settings */}
      <div>
        <h3 className="font-semibold mb-3">Account</h3>
        <div className="space-y-2">
          {[
            { icon: <User className="w-4 h-4" />, label: "Edit Profile", action: "chevron" },
            { icon: <Bell className="w-4 h-4" />, label: "Notifications", action: "chevron" },
            { icon: <Shield className="w-4 h-4" />, label: "Privacy & Security", action: "chevron" },
            { icon: <CloudUpload className="w-4 h-4" />, label: "Cloud Backup", action: "chevron" },
            { icon: <Globe className="w-4 h-4" />, label: "Language", action: "English" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {item.action === "chevron" ? (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              ) : (
                <span className="text-sm text-muted-foreground">{item.action}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Travel Preferences */}
      <div>
        <h3 className="font-semibold mb-3">Travel Preferences</h3>
        <div className="space-y-2">
          {[
            { icon: <DollarSign className="w-4 h-4" />, label: "Budget Range", value: "Mid-range" },
            { icon: <Users className="w-4 h-4" />, label: "Travel Style", value: "Cultural Explorer" },
            { icon: <Home className="w-4 h-4" />, label: "Accommodation", value: "Hotels & B&Bs" },
            { icon: <UtensilsCrossed className="w-4 h-4" />, label: "Cuisine", value: "Local & International" }
          ].map((pref, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {pref.icon}
                <span className="font-medium text-sm">{pref.label}</span>
              </div>
              <span className="text-sm text-muted-foreground">{pref.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sharing & Groups */}
      <div>
        <h3 className="font-semibold mb-3">Sharing & Groups</h3>
        <div className="space-y-2">
          {[
            { icon: <Share2 className="w-4 h-4" />, label: "Share Trip Plans", desc: "Send to companions" },
            { icon: <UserPlus className="w-4 h-4" />, label: "Invite Travel Partners", desc: "Collaborate on trips" },
            { icon: <Lock className="w-4 h-4" />, label: "Private Trip Mode", desc: "Keep trips confidential" },
            { icon: <Users className="w-4 h-4" />, label: "Group Expenses", desc: "Split costs fairly" }
          ].map((item, index) => (
            <Card key={index} className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Support */}
      <div>
        <h3 className="font-semibold mb-3">Support</h3>
        <div className="space-y-2">
          {[
            { icon: <MessageCircle className="w-4 h-4" />, label: "Help Center" },
            { icon: <Bot className="w-4 h-4" />, label: "Chat with Tavi", action: () => setIsChatbotOpen(true) },
            { icon: <Star className="w-4 h-4" />, label: "Rate App" },
            { icon: <Share2 className="w-4 h-4" />, label: "Share with Friends" }
          ].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={item.action}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home': return renderHomeScreen();
      case 'explore': return renderExploreScreen();
      case 'trips': return renderTripsScreen();
      case 'budget': return renderBudgetScreen();
      case 'profile': return renderProfileScreen();
      default: return renderHomeScreen();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-[#2C6E49] via-[#4C956C] to-[#2C6E49] min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: '#FEFEE3' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#FFC9B9', opacity: 0.2 }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#D68C45', opacity: 0.15, animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#4C956C', opacity: 0.1, animationDelay: '4s' }}></div>
      </div>

      {/* Status Bar */}
      <div className="relative z-10 backdrop-blur-xl border-b px-4 py-3 flex justify-between items-center" style={{ backgroundColor: 'rgba(44, 110, 73, 0.2)', borderColor: 'rgba(254, 254, 227, 0.1)' }}>
        <div className="text-sm font-semibold" style={{ color: '#FEFEE3' }}>09:41</div>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1 h-3 rounded-full" style={{ backgroundColor: '#FEFEE3' }}></div>
            ))}
          </div>
          <Wifi className="w-4 h-4" style={{ color: '#FEFEE3' }} />
          <div className="w-6 h-3 border rounded-sm" style={{ borderColor: '#FEFEE3' }}>
            <div className="w-4 h-1.5 rounded-sm m-0.5" style={{ backgroundColor: '#FEFEE3' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-24 relative z-10">
        {renderCurrentScreen()}
      </div>

      {/* Floating Chat Button */}
      <Button
        className="fixed bottom-28 right-6 w-16 h-16 rounded-2xl shadow-2xl hover:shadow-3xl z-20 border backdrop-blur-xl hover:scale-110 transition-all"
        style={{ 
          background: `linear-gradient(135deg, #D68C45, #FFC9B9)`,
          borderColor: 'rgba(254, 254, 227, 0.2)',
          color: '#2C6E49'
        }}
        onClick={() => setIsChatbotOpen(true)}
      >
        <Bot className="w-7 h-7" />
      </Button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-30">
        <div 
          className="backdrop-blur-2xl border-t mx-4 rounded-t-3xl px-6 py-5"
          style={{ 
            backgroundColor: 'rgba(44, 110, 73, 0.4)', 
            borderColor: 'rgba(254, 254, 227, 0.1)' 
          }}
        >
          <div className="flex items-center justify-around">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'trips', icon: Map, label: 'Trips' },  
              { id: 'budget', icon: Wallet, label: 'Budget' },
              { id: 'explore', icon: Gamepad2, label: 'Explore' },
              { id: 'profile', icon: User, label: 'Profile' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentScreen(tab.id as Screen)}
                className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all hover:scale-110"
                style={{
                  backgroundColor: currentScreen === tab.id ? '#FFC9B9' : 'transparent',
                  color: currentScreen === tab.id ? '#2C6E49' : 'rgba(254, 254, 227, 0.6)',
                  boxShadow: currentScreen === tab.id ? '0 4px 20px rgba(255, 201, 185, 0.3)' : 'none'
                }}
              >
                <tab.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot Dialog */}
      <ChatbotDialog 
        open={isChatbotOpen} 
        onOpenChange={setIsChatbotOpen} 
      />
    </div>
  );
}