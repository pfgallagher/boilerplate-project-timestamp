const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/api/timestamp/:dateString", (req, res, next) => {
	let date = req.params.dateString;
	if (/^\d{1,}$/g.test(date)) date = parseInt(date, 10);
	if (date === "") {
		const now = new Date();
		res.json({
			unix: now.getTime(),
			utc: now.toUTCString(),
		});
	} else if (`${new Date(date)}` === "Invalid Date")
		res.json({
			error: "Invalid Date",
		});
	else {
		const enteredDate = new Date(date);
		res.json({
			unix: enteredDate.getTime(),
			utc: enteredDate.toUTCString(),
		});
	}
});

const listener = app.listen(process.env.PORT, () => {
	console.log(`Your app is listening on port ${listener.address().port}`);
});
