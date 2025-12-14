"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PieChart = dynamic(
    () => import("@mui/x-charts/PieChart").then((mod) => mod.PieChart),
    { ssr: false }
);



import "bootstrap/dist/css/bootstrap.min.css";

// --- Embedded Data (No external file needed)
interface UsageData {
    name: string;
    value: number;
}
const valueFormatter = (item: any) => `${item.value}%`;

import {
    TextField,
    Toolbar,
    AppBar,
    Typography,
    Box,
    Tabs,
    Tab,
    Button,
    Grid
} from "@mui/material";

function TabPanel({ children, value, index }: any) {
    return (
        <div hidden={value !== index} style={{ height: "100%" }}>
            {value === index && (
                <Box sx={{ p: 2, height: "100%", overflowY: "auto" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function Uploadwebseries() {

    const [value, setValue] = useState(0);

    const [telugu, settelugu] = useState([]);
    const [hindhi, sethindhi] = useState([]);
    const [english, setenglish] = useState([]);
    const [tamil, settamil] = useState([]);
    const [malayalam, setmalayalam] = useState([]);

    const defaultColors = [
        "#4e79a7", // Blue
        "#f28e2b", // Orange
        "#e15759", // Red
        "#76b7b2", // Teal
        "#59a14f", // Green
    ];

    const mobileAndDesktopOS = [
        { label: "Telugu", value: telugu.length, color: defaultColors[0] },
        { label: "Hindi", value: hindhi.length, color: defaultColors[1] },
        { label: "English", value: english.length, color: defaultColors[2] },
        { label: "Tamil", value: tamil.length, color: defaultColors[3] },
        { label: "Malayalam", value: malayalam.length, color: defaultColors[4] },
    ];


    const [form, setForm] = useState({
        moviename: "",
        year: "",
        starring: "",
        genres: "",
        categories: "",
        country: "",
        language: "",
        directorName: "",
        description: "",
        poster: "",
        video: "",
    });
    // HANDLE INPUT
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };



    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch("/api/movieslist");
            const data = await res.json();// Filter by language
            settelugu(data.filter((m: any) => m.language === "Telugu"));
            sethindhi(data.filter((m: any) => m.language === "Hindi"));
            setenglish(data.filter((m: any) => m.language === "English"));
            settamil(data.filter((m: any) => m.language === "Tamil"));
            setmalayalam(data.filter((m: any) => m.language === "Malayalam"));
        };

        fetchMovies();
    }, []);



    const [preview, setPreview] = useState("");
    const [videoPreview, setVideoPreview] = useState("");
    const [uploading, setUploading] = useState(false);



    // POSTER UPLOAD
    const handlePosterUpload = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));

        const reader = new FileReader();
        reader.onloadend = () =>
            setForm((prev: any) => ({ ...prev, poster: reader.result }));
        reader.readAsDataURL(file);
    };

    // VIDEO UPLOAD
    const handleVideoUpload = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setVideoPreview(URL.createObjectURL(file));

        const reader = new FileReader();
        reader.onloadend = () =>
            setForm((prev: any) => ({ ...prev, video: reader.result }));
        reader.readAsDataURL(file);
    };

    // SUBMIT FORM
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setUploading(true);

        if (!form.poster || !form.video) {
            alert("Please select both poster & video!");
            return setUploading(false);
        }

        try {
            const res = await fetch("/api/uploadmovie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error);
                return;
            }

            alert("Movie added successfully!");

            setForm({
                moviename: "",
                year: "",
                starring: "",
                genres: "",
                categories: "",
                country: "",
                language: "",
                directorName: "",
                description: "",
                poster: "",
                video: "",
            });
            setPreview("");
            setVideoPreview("");
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setUploading(false);
        }
    };

    const handleClose = () => {
        setForm({
            moviename: "",
            year: "",
            starring: "",
            genres: "",
            categories: "",
            country: "",
            language: "",
            directorName: "",
            description: "",
            poster: "",
            video: "",
        });
    }

    return (

        <>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"



            >
                <div className="modal-dialog"
                    style={{
                        minWidth: "800px"
                    }}>
                    <div className="modal-content  " >


                        <TabPanel value={value} index={0} >
                            <Box >
                                <Typography variant="h4" className="mb-4   ">
                                    Upload new Podcast
                                    <button
                                        style={{
                                            marginLeft: "430px",
                                            height: "10px",

                                        }}
                                        onClick={handleClose}
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"

                                    ></button>
                                </Typography>

                                <form onSubmit={handleSubmit} >
                                    <Grid container spacing={2}>

                                        {/* 2-Column Fields */}

                                        <Grid  >
                                            <TextField
                                                label="moviename"
                                                name="moviename"
                                                fullWidth
                                                value={form.moviename}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                type="number"
                                                label="Year"
                                                name="year"
                                                fullWidth
                                                value={form.year}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                label="Starring"
                                                name="starring"
                                                fullWidth
                                                value={form.starring}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                label="Genres"
                                                name="genres"
                                                fullWidth
                                                value={form.genres}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                label="Categories"
                                                name="categories"
                                                fullWidth
                                                value={form.categories}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                label="Country"
                                                name="country"
                                                fullWidth
                                                value={form.country}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                select
                                                name="language"
                                                fullWidth
                                                value={form.language}
                                                onChange={handleChange}
                                                SelectProps={{ native: true }}
                                            >
                                                <option value="">Select Language</option>
                                                <option value="Telugu">Telugu</option>
                                                <option value="Hindi">Hindi</option>
                                                <option value="English">English</option>
                                                <option value="Tamil">Tamil</option>
                                                <option value="Kannada">Kannada</option>
                                                <option value="Malayalam">Malayalam</option>
                                            </TextField>
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                label="Director Name"
                                                name="directorName"
                                                fullWidth
                                                value={form.directorName}
                                                onChange={handleChange}
                                            />
                                        </Grid>




                                        {/* FULL WIDTH FIELDS (Last 3) */}
                                        <Grid>
                                            <TextField
                                                label="Description"
                                                name="description"
                                                fullWidth
                                                multiline
                                                rows={1}
                                                value={form.description}
                                                onChange={handleChange}

                                            />
                                        </Grid>

                                        <Grid>
                                            <label className="form-label">Poster Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="form-control"
                                                onChange={handlePosterUpload}
                                            />
                                            {preview && (
                                                <>
                                                    <p className="mt-2">Preview:</p>
                                                    <img src={preview} width={200} />
                                                </>
                                            )}
                                        </Grid>

                                        <Grid>
                                            <label className="form-label">Movie Video</label>
                                            <input
                                                type="file"
                                                accept="video/*"
                                                className="form-control"
                                                onChange={handleVideoUpload}
                                            />
                                            {videoPreview && (
                                                <>
                                                    <p className="mt-2">Preview:</p>
                                                    <video src={videoPreview} width={200} controls />
                                                </>
                                            )}
                                        </Grid>



                                    </Grid>
                                    <Button
                                        style={{
                                            marginTop: '10px'
                                        }}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        disabled={uploading}
                                    >
                                        {uploading ? "Uploading..." : "Upload Movie"}
                                    </Button>
                                </form>

                            </Box>
                        </TabPanel>

                        <div className="modal-footer">


                        </div>
                    </div>
                </div>
            </div>
            {/* MODAL END */}


            <Toolbar
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    padding: "10px 20px",
                    bgcolor: "#24404b",
                    color: "white",
                }}
            >
                {/* Title */}
                <h2 style={{ margin: 0, whiteSpace: "nowrap" }}>Webseries</h2>

                {/* Search Input (Expands automatically) */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: "450px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search Movie"
                        className="form-control search-white"
                        style={{
                            backgroundColor: "#1f333b",
                            color: "white",
                            border: "1px solid #3c606c",
                            borderRight: "none",
                            borderTopLeftRadius: "6px",
                            borderBottomLeftRadius: "6px",
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                            height: "40px",
                            flexGrow: 1,
                        }}
                    />

                    <button
                        style={{
                            backgroundColor: "#1e88e5",
                            color: "white",
                            border: "1px solid #3c606c",
                            borderTopRightRadius: "6px",
                            borderBottomRightRadius: "6px",
                            padding: "0 16px",
                            height: "40px",
                            cursor: "pointer",
                        }}
                    >
                        Search
                    </button>
                </div>


                {/* Upload Button */}
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@getbootstrap"
                >
                    Upload movie
                </button>
            </Toolbar>






            <Box
                sx={{

                    width: "100%",
                    height: "calc(100vh - 64px)",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    border: "1px solid black",
                }}
            >
                {/* LEFT: UPLOADS + ADD MOVIE */}
                <Box
                    sx={{
                        border: "1px solid black",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}
                >


                    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        {/* TABS */}
                        <AppBar position="static" sx={{ bgcolor: "#24404b" }}>
                            <Tabs
                                value={value}
                                onChange={(e, v) => setValue(v)}
                                variant="fullWidth"
                                textColor="inherit"
                                indicatorColor="primary"
                            >
                                <Tab label="ENGLISH" />
                                <Tab label="TELUGU" />
                                <Tab label="TAMIL" />
                                <Tab label="HINDHI" />
                                <Tab label="MALAYALAM" />

                            </Tabs>
                        </AppBar>

                        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                            {/* TAB 1 */}


                            {/* TAB 2 - FULL MOVIE UPLOAD FORM */}

                            <TabPanel value={value} index={0}>
                                <Typography
                                    style={{

                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"

                                    }}
                                >
                                    <Box  >
                                        <Box>
                                            {english.length === 0 && <Typography>No movies available</Typography>}
                                            {[...english].reverse().map((movie: any, index: number) => (
                                                <Box
                                                    key={index}
                                                    sx={{

                                                        display: "flex",
                                                        alignItems: "center",
                                                        backgroundColor: "#ee0e0",
                                                        width: "650px",
                                                        borderRadius: "5px",
                                                        gap: 2,
                                                        border: "1px solid black",
                                                        marginBottom: "2px",

                                                    }}
                                                >
                                                    {/* Poster */}
                                                    <img
                                                        src={movie.poster}
                                                        alt={movie.moviename}
                                                        style={{
                                                            width: "60px",
                                                            height: "85px",
                                                            objectFit: "cover",
                                                            borderRadius: "6px",
                                                            overflow: "hidden",
                                                        }}
                                                    />

                                                    {/* Movie Name + Year */}
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography
                                                            style={{

                                                                fontSize: "1.4rem"
                                                            }}
                                                            variant="h6" color="#bec0c2"  >{movie.moviename}</Typography>
                                                        <Typography color="black">Released: {movie.year}</Typography>
                                                    </Box>

                                                    {/* Right Arrow */}
                                                    <Typography
                                                        sx={{
                                                            fontSize: "24px",
                                                            fontWeight: "bold",
                                                            color: "#333",
                                                            paddingRight: "10px",
                                                        }}
                                                    >
                                                        &gt;

                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>


                                </Typography>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Typography
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"

                                    }}
                                >   <Box  >
                                        <Box>
                                            {telugu.length === 0 && <Typography>No movies available</Typography>}
                                            {[...telugu].reverse().map((movie: any, index: number) => (
                                                <Box
                                                    key={index}
                                                    sx={{

                                                        display: "flex",
                                                        alignItems: "center",
                                                        backgroundColor: "#ee0e0",
                                                        width: "650px",
                                                        borderRadius: "5px",
                                                        gap: 2,
                                                        border: "1px solid black",
                                                        marginBottom: "2px",

                                                    }}
                                                >
                                                    {/* Poster */}
                                                    <img
                                                        src={movie.poster}
                                                        alt={movie.moviename}
                                                        style={{
                                                            width: "60px",
                                                            height: "85px",
                                                            objectFit: "cover",
                                                            borderRadius: "6px",
                                                            overflow: "hidden",
                                                        }}
                                                    />

                                                    {/* Movie Name + Year */}
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography
                                                            style={{

                                                                fontSize: "1.4rem"
                                                            }}
                                                            variant="h6" color="#bec0c2"  >{movie.moviename}</Typography>
                                                        <Typography color="black">Released: {movie.year}</Typography>
                                                    </Box>

                                                    {/* Right Arrow */}
                                                    <Typography
                                                        sx={{
                                                            fontSize: "24px",
                                                            fontWeight: "bold",
                                                            color: "#333",
                                                            paddingRight: "10px",
                                                        }}
                                                    >
                                                        &gt;

                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Typography>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Typography
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"

                                    }}
                                >   <Box  >
                                        <Box>
                                            {tamil.length === 0 && <Typography>No movies available</Typography>}
                                            {[...tamil].reverse().map((movie: any, index: number) => (
                                                <Box
                                                    key={index}
                                                    sx={{

                                                        display: "flex",
                                                        alignItems: "center",
                                                        backgroundColor: "#ee0e0",
                                                        width: "650px",
                                                        borderRadius: "5px",
                                                        gap: 2,
                                                        border: "1px solid black",
                                                        marginBottom: "2px",

                                                    }}
                                                >
                                                    {/* Poster */}
                                                    <img
                                                        src={movie.poster}
                                                        alt={movie.moviename}
                                                        style={{
                                                            width: "60px",
                                                            height: "85px",
                                                            objectFit: "cover",
                                                            borderRadius: "6px",
                                                            overflow: "hidden",
                                                        }}
                                                    />

                                                    {/* Movie Name + Year */}
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography
                                                            style={{

                                                                fontSize: "1.4rem"
                                                            }}
                                                            variant="h6" color="#bec0c2"  >{movie.moviename}</Typography>
                                                        <Typography color="black">Released: {movie.year}</Typography>
                                                    </Box>

                                                    {/* Right Arrow */}
                                                    <Typography
                                                        sx={{
                                                            fontSize: "24px",
                                                            fontWeight: "bold",
                                                            color: "#333",
                                                            paddingRight: "10px",
                                                        }}
                                                    >
                                                        &gt;

                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Typography>
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <Typography
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"

                                    }}
                                >   <Box  >
                                        <Box>
                                            {hindhi.length === 0 && <Typography>No movies available</Typography>}
                                            {[...hindhi].reverse().map((movie: any, index: number) => (
                                                <Box
                                                    key={index}
                                                    sx={{

                                                        display: "flex",
                                                        alignItems: "center",
                                                        backgroundColor: "#ee0e0",
                                                        width: "650px",
                                                        borderRadius: "5px",
                                                        gap: 2,
                                                        border: "1px solid black",
                                                        marginBottom: "2px",

                                                    }}
                                                >
                                                    {/* Poster */}
                                                    <img
                                                        src={movie.poster}
                                                        alt={movie.moviename}
                                                        style={{
                                                            width: "60px",
                                                            height: "85px",
                                                            objectFit: "cover",
                                                            borderRadius: "6px",
                                                            overflow: "hidden",
                                                        }}
                                                    />

                                                    {/* Movie Name + Year */}
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography
                                                            style={{

                                                                fontSize: "1.4rem"
                                                            }}
                                                            variant="h6" color="#bec0c2"  >{movie.moviename}</Typography>
                                                        <Typography color="black">Released: {movie.year}</Typography>
                                                    </Box>

                                                    {/* Right Arrow */}
                                                    <Typography
                                                        sx={{
                                                            fontSize: "24px",
                                                            fontWeight: "bold",
                                                            color: "#333",
                                                            paddingRight: "10px",
                                                        }}
                                                    >
                                                        &gt;

                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Typography>
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <Typography
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"

                                    }}
                                >   <Box  >
                                        <Box>
                                            {malayalam.length === 0 && <Typography>No movies available</Typography>}
                                            {[...malayalam].reverse().map((movie: any, index: number) => (
                                                <Box
                                                    key={index}
                                                    sx={{

                                                        display: "flex",
                                                        alignItems: "center",
                                                        backgroundColor: "#ee0e0",
                                                        width: "650px",
                                                        borderRadius: "5px",
                                                        gap: 2,
                                                        border: "1px solid black",
                                                        marginBottom: "2px",

                                                    }}
                                                >
                                                    {/* Poster */}
                                                    <img
                                                        src={movie.poster}
                                                        alt={movie.moviename}
                                                        style={{
                                                            width: "60px",
                                                            height: "85px",
                                                            objectFit: "cover",
                                                            borderRadius: "6px",
                                                            overflow: "hidden",
                                                        }}
                                                    />

                                                    {/* Movie Name + Year */}
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Typography
                                                            style={{

                                                                fontSize: "1.4rem"
                                                            }}
                                                            variant="h6" color="#bec0c2"  >{movie.moviename}</Typography>
                                                        <Typography color="black">Released: {movie.year}</Typography>
                                                    </Box>

                                                    {/* Right Arrow */}
                                                    <Typography
                                                        sx={{
                                                            fontSize: "24px",
                                                            fontWeight: "bold",
                                                            color: "#333",
                                                            paddingRight: "10px",
                                                        }}
                                                    >
                                                        &gt;

                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Typography>
                            </TabPanel>

                        </Box>
                    </Box>


                </Box>


                <Box
                    sx={{
                        height: "100%",
                        overflowY: "auto",
                    }}
                >
                    {/* STICKY HEADER */}
                    <Box
                        sx={{
                            position: "sticky",
                            top: 0,
                            background: "#24404b",
                            zIndex: 10,
                        }}
                    >
                        <Typography variant="h5" sx={{
                            fontWeight: "bold",
                            fontSize: "2rem"
                            , padding: 1,
                            paddingLeft: "12px",
                            color: "#d2f7f4"

                        }}>Show Time PodcastData

                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 4, alignItems: "center", paddingLeft: "30px" }}>

                        {/* LEFT SIDE : SMALL COLOR CIRCLES (LEGEND) */}


                        {/* RIGHT SIDE : PIE CHART */}
                        <PieChart

                            height={300}
                            width={300}
                            series={[
                                {
                                    data: mobileAndDesktopOS.slice(0, 5),
                                    innerRadius: 70,

                                    arcLabelMinAngle: 20,
                                    valueFormatter,
                                },
                            ]}
                        />

                    </Box>

                </Box>
            </Box>


        </>
    );
}
