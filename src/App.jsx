import img_logo from "./assets/images/logo.svg"
import img_eatingMan from "./assets/images/image-man-eating.webp"
import img_eating from "./assets/images/icon-eating.svg"
import img_exercise from "./assets/images/icon-exercise.svg"
import img_sleep from "./assets/images/icon-sleep.svg"

function App() {
	return (
		<>
			<div className="background"></div>
			<section className="calculator-section">

				<div className="container">
					<header className="calculator-section__header">
						<img src={img_logo} alt="A blue circle outline with wavy lines inside inside of it and a smaller filled in circle in the center" />
					</header>

					<main className="calculator-section__grid">
						<div className="calculator-section__description">
							<h1 className="heading-1">Body Mass Index Calculator</h1>
							<p className="margin-block-start-8">Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.</p>
						</div>
						<div className="card" style={{"--flow-spacing": "2rem"}}>
							<h3 className="card__heading | fs-600">Enter your details below</h3>
							<div className="form-group">

								<div className="radio-group">
									<input id="metric" name="radio" type="radio" defaultChecked />
									<label className="clr-neutral-800 fs-400" htmlFor="metric">Metric</label>
								</div>

								<div className="radio-group">
									<input id="imperial" name="radio" type="radio" />
									<label className="clr-neutral-800 fs-400" htmlFor="imperial">Imperial</label>
								</div>
			
								<div className="input-group" data-unit="cm">
									<label htmlFor="height">Height</label>
									<input  name="height" type="text" placeholder="0"/>
								</div>

								<div className="input-group" data-unit="kg">
									<label htmlFor="weight">Weight</label>
									<input name="weight" type="text" placeholder="0"/>
								</div>

								<div className="result">
									<div>
										<h3 className="heading-3 | clr-neutral-000">Welcome!</h3>
										<p className="margin-block-start-4">Enter your height and weight and you’ll see your BMI result here</p>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
			</section>

			<section className="section">
				<div className="container">

				<div>
					<img src={img_eatingMan} alt="A healthy looking smiling man in a white shirt holding a sushi roll with a pair of chopsticks" />

					<div>
						<h2 className="heading-2">What your BMI result means</h2>
						<p>A BMI range of 18.5 to 24.9 is considered a &apos;healthy weight.&apos; Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.</p>
					</div>
				</div>

				</div>
			</section>

			<section className="section">
				<div className="container bg-neutral-400" data-type="full-bleed">
					
					<div className="even-columns">

						<div>
							<img src={img_eating} alt="A bowl with food" />

							<div>
								<h3 className="heading-3">Healthy eating</h3>
								<p>Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.</p>
							</div>
						</div>

						<div>
							<img src={img_exercise} alt="A dumbbell" />

							<div>
								<h3 className="heading-3">Regular exercise</h3>
								<p>Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.</p>
							</div>
						</div>

						<div>
							<img src={img_sleep} alt="A half moon with stars" />

							<div>
								<h3 className="heading-3">Adequate sleep</h3>
								<p>Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.</p>
							</div>
						</div>
						
					</div>

				</div>
			</section>

			<section className="section">
				<div className="container">
					
				</div>
			</section>
		</>
  )
}

export default App
