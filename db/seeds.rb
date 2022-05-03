Workout.create!([
 {
   user_id: 1,
   title: "Barbell Flat Bench Press",
   description: "5 Sets of 10",
   sets: 5,
   reps: 10,
   weight: 315,
   image: "https://dynl.mktgcdn.com/p/k4pJ2KMV85Udr_DY31ymS549FEIoXQrmbAblJ9kgI8Q/1900x1222.jpg",
   likes: 5,
 },
 {
   user_id: 1,
   title: "Barbell Incline Bench Press",
   description: "3 Sets of 10",
   sets: 3,
   reps: 10,
   weight: 225,
   image: "https://dynl.mktgcdn.com/p/8OyNytZvZF5DUki4bzNqxRJ5rIct5F8eRXKT7J4gQA4/1900x1226.jpg",
   likes: 3,
 },
 {
   user_id: 1,
   title: "Barbell Decline Bench Press",
   description: "5 Sets of 10",
   sets: 5,
   reps: 10,
   weight: 345,
   image: "https://dynl.mktgcdn.com/p/Zmnta_tjPGDK-7OF0Ij7haw12bFKAXNq_C748sCW7jo/800x670.jpg",
   likes: 2,
 },
 {
   user_id: 2,
   title: "Tricep Push Down(overhand)",
   description: "3 Sets of 10",
   sets: 3,
   reps: 10,
   weight: 120,
   image: "https://dynl.mktgcdn.com/p/zqLEQkS_GqMs9e_Mnca3jCnAPCrjuV1JfSwaD6DTVDs/1900x1210.jpg",
   likes: 7,
 },
 {
   user_id: 3,
   title: "Dips",
   description: "3 Sets of 10",
   sets: 3,
   reps: 10,
   weight: 45,
   image: "https://dynl.mktgcdn.com/p/SDI-7VfebNMPbbu2x3eBNYKhdI7JrTfoL7MZd32-oyo/1900x799.jpg",
   likes: 5,
 },
 {
   user_id: 3,
   title: "Tricep Pull Down(underhand)",
   description: "3 Sets of 10",
   sets: 3,
   reps: 10,
   weight: 45,
   image: "https://dynl.mktgcdn.com/p/DSixD_CeAF9v9bjJpseClPnZOB58-oF5uEv_q2BqcFs/1900x1243.jpg",
   likes: 2,
 },
 ])
 
puts "✅ Done seeding workouts!"
