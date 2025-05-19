import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  createTheme,
  ThemeProvider,
  alpha,
  useMediaQuery,
  Divider,
  IconButton,
} from "@mui/material";
import {
  ReportProblem as ReportIcon,
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  ArrowForward as ArrowIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
  Notifications as NotificationsIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintTracker from "./components/ComplaintTracker";
import AdminDashboard from "./components/AdminDashboard";

// Create a custom theme with vibrant colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#6B4EFF", // Vibrant purple
      dark: "#5A3FE5",
      light: "#8A7AFF",
    },
    secondary: {
      main: "#00C853", // Vibrant green
      dark: "#00A844",
      light: "#33D375",
    },
    background: {
      default: "#F8F9FF",
      paper: "#FFFFFF",
    },
  },
  typography: {
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.5px",
    },
    h5: {
      fontWeight: 700,
      letterSpacing: "-0.3px",
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: "visible",
        },
      },
    },
  },
});

// Decorative background pattern component
const BackgroundPattern = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: `
        radial-gradient(circle at 25px 25px, #6B4EFF 2%, transparent 0%),
        radial-gradient(circle at 75px 75px, #00C853 2%, transparent 0%),
        linear-gradient(45deg, transparent 48%, #6B4EFF 49%, #6B4EFF 51%, transparent 52%),
        linear-gradient(-45deg, transparent 48%, #00C853 49%, #00C853 51%, transparent 52%)
      `,
      backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
      animation: "patternMove 20s linear infinite",
      "@keyframes patternMove": {
        "0%": {
          backgroundPosition: "0 0, 0 0, 0 0, 0 0",
        },
        "100%": {
          backgroundPosition: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
        },
      },
    }}
  />
);

// Floating animation component
const FloatingElement = ({ children, delay = 0 }) => (
  <Box
    sx={{
      animation: `float 6s ease-in-out ${delay}s infinite`,
      "@keyframes float": {
        "0%, 100%": {
          transform: "translateY(0)",
        },
        "50%": {
          transform: "translateY(-20px)",
        },
      },
    }}
  >
    {children}
  </Box>
);

// Footer component
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.primary.main,
        color: "white",
        py: 6,
        mt: "auto",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #00C853 0%, #6B4EFF 100%)",
        },
      }}
    >
      <BackgroundPattern />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <StarIcon sx={{ color: "#FFD700" }} />
                Citizen Engagement System
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Empowering citizens to voice their concerns and track their
                complaints efficiently.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/submit"
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                Submit Complaint
              </Button>
              <Button
                component={Link}
                to="/admin"
                sx={{
                  color: "white",
                  justifyContent: "flex-start",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                Admin Dashboard
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon />
                <Typography variant="body2">
                  support@citizenengagement.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationIcon />
                <Typography variant="body2">
                  123 Government Street, City, Country
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Citizen Engagement System. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const App: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "#F8F9FF",
          position: "relative",
        }}
      >
        <BackgroundPattern />

        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "#6B4EFF",
            background: "linear-gradient(135deg, #6B4EFF 0%, #8A7AFF 100%)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            },
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FloatingElement>
                <StarIcon sx={{ color: "#FFD700" }} />
              </FloatingElement>
              Citizen Engagement System
            </Typography>
            {!isMobile && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.15)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/submit"
                  sx={{
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.15)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Submit Complaint
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin"
                  sx={{
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.15)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Admin Dashboard
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4, position: "relative", flex: 1 }}>
    <Routes>
            <Route
              path="/"
              element={
                <Box>
                  {/* Hero Section */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 6,
                      mb: 6,
                      textAlign: "center",
                      background:
                        "linear-gradient(135deg, #6B4EFF 0%, #8A7AFF 100%)",
                      color: "white",
                      borderRadius: 4,
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                      },
                    }}
                  >
                    <FloatingElement>
                      <SecurityIcon
                        sx={{ fontSize: 60, mb: 2, opacity: 0.8 }}
                      />
                    </FloatingElement>
                    <Typography
                      variant="h3"
                      component="h1"
                      gutterBottom
                      sx={{
                        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        animation: "fadeInUp 0.8s ease-out",
                        "@keyframes fadeInUp": {
                          "0%": {
                            opacity: 0,
                            transform: "translateY(20px)",
                          },
                          "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                        },
                      }}
                    >
                      Welcome to the Citizen Engagement System
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 4,
                        opacity: 0.9,
                        animation: "fadeInUp 0.8s ease-out 0.2s both",
                      }}
                    >
                      Your voice matters. Submit complaints, track their status,
                      and get updates from government agencies.
                    </Typography>
                    <Box
                      sx={{
                        mt: 4,
                        animation: "fadeInUp 0.8s ease-out 0.4s both",
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/submit"
                        size="large"
                        startIcon={<ReportIcon />}
                        endIcon={<ArrowIcon />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          bgcolor: "#00C853",
                          "&:hover": {
                            bgcolor: "#00A844",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(0, 200, 83, 0.3)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Submit a Complaint
                      </Button>
                      <Button
                        variant="outlined"
                        color="inherit"
                        component={Link}
                        to="/admin"
                        size="large"
                        startIcon={<DashboardIcon />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderColor: "white",
                          "&:hover": {
                            borderColor: "white",
                            bgcolor: "rgba(255,255,255,0.15)",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Admin Dashboard
                      </Button>
                    </Box>
                  </Paper>

                  {/* Features Section */}
                  <Grid container spacing={4}>
                    {[
                      {
                        icon: (
                          <ReportIcon sx={{ fontSize: 48, color: "#6B4EFF" }} />
                        ),
                        title: "Submit Complaints",
                        description:
                          "Easily submit your complaints with detailed information and get them assigned to the right agency.",
                        color: "#6B4EFF",
                        link: "/submit",
                        features: [
                          "Quick Submission",
                          "Detailed Forms",
                          "File Attachments",
                        ],
                      },
                      {
                        icon: (
                          <DescriptionIcon
                            sx={{ fontSize: 48, color: "#00C853" }}
                          />
                        ),
                        title: "Track Status",
                        description:
                          "Monitor the progress of your complaints and receive updates on their status in real-time.",
                        color: "#00C853",
                        link: "/submit",
                        features: [
                          "Real-time Updates",
                          "Status Tracking",
                          "Email Notifications",
                        ],
                      },
                      {
                        icon: (
                          <DashboardIcon
                            sx={{ fontSize: 48, color: "#6B4EFF" }}
                          />
                        ),
                        title: "Admin Dashboard",
                        description:
                          "Agency staff can manage complaints, provide responses, and update complaint statuses efficiently.",
                        color: "#6B4EFF",
                        link: "/admin",
                        features: [
                          "Complaint Management",
                          "Response System",
                          "Analytics",
                        ],
                      },
                    ].map((feature, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Card
                          elevation={2}
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              height: "4px",
                              background: `linear-gradient(90deg, ${
                                feature.color
                              } 0%, ${alpha(feature.color, 0.5)} 100%)`,
                              borderTopLeftRadius: 16,
                              borderTopRightRadius: 16,
                            },
                            "&:hover": {
                              transform: "translateY(-8px)",
                              boxShadow: `0 12px 24px ${alpha(
                                feature.color,
                                0.15
                              )}`,
                              "& .feature-icon": {
                                transform: "scale(1.1) rotate(5deg)",
                              },
                              "& .feature-list": {
                                opacity: 1,
                                transform: "translateY(0)",
                              },
                            },
                          }}
                        >
                          <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 2,
                              }}
                            >
                              <Box
                                className="feature-icon"
                                sx={{
                                  transition:
                                    "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                  p: 2,
                                  borderRadius: "50%",
                                  bgcolor: alpha(feature.color, 0.1),
                                }}
                              >
                                {feature.icon}
                              </Box>
                            </Box>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              align="center"
                              sx={{ mb: 2 }}
                            >
                              {feature.title}
                            </Typography>
                            <Typography
                              align="center"
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              {feature.description}
                            </Typography>
                            <Box
                              className="feature-list"
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                opacity: 0.7,
                                transform: "translateY(10px)",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {feature.features.map((feat, idx) => (
                                <Box
                                  key={idx}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    color: "text.secondary",
                                  }}
                                >
                                  <CheckIcon
                                    fontSize="small"
                                    sx={{ color: feature.color }}
                                  />
                                  <Typography variant="body2">
                                    {feat}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </CardContent>
                          <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                            <Button
                              component={Link}
                              to={feature.link}
                              sx={{
                                color: feature.color,
                                "&:hover": {
                                  bgcolor: alpha(feature.color, 0.1),
                                  transform: "translateX(4px)",
                                },
                                transition: "all 0.3s ease",
                              }}
                              endIcon={<ArrowIcon />}
                            >
                              Learn More
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Stats Section */}
                  <Box sx={{ mt: 8, mb: 4 }}>
                    <Grid container spacing={4}>
                      {[
                        {
                          icon: <SpeedIcon />,
                          value: "24/7",
                          label: "Response Time",
                        },
                        {
                          icon: <SupportIcon />,
                          value: "100%",
                          label: "Support",
                        },
                        {
                          icon: <NotificationsIcon />,
                          value: "Real-time",
                          label: "Updates",
                        },
                      ].map((stat, index) => (
                        <Grid item xs={12} md={4} key={index}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 3,
                              textAlign: "center",
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                              borderRadius: 4,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                              },
                            }}
                          >
                            <FloatingElement delay={index * 0.2}>
                              <Box
                                sx={{
                                  color: theme.palette.primary.main,
                                  mb: 1,
                                }}
                              >
                                {stat.icon}
                              </Box>
                            </FloatingElement>
                            <Typography
                              variant="h4"
                              sx={{ fontWeight: 700, mb: 1 }}
                            >
                              {stat.value}
                            </Typography>
                            <Typography color="text.secondary">
                              {stat.label}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              }
            />
            <Route path="/submit" element={<ComplaintForm />} />
            <Route path="/tracker/:id" element={<ComplaintTracker />} />
            <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
