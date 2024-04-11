import img_logo from "./assets/images/logo.svg"
import img_eatingMan from "./assets/images/image-man-eating.webp"
import img_eating from "./assets/images/icon-eating.svg"
import img_exercise from "./assets/images/icon-exercise.svg"
import img_sleep from "./assets/images/icon-sleep.svg"
import img_line_right from "./assets/images/pattern-curved-line-right.svg"
import img_line_left from "./assets/images/pattern-curved-line-left.svg"
import img_gender from "./assets/images/icon-gender.svg"
import img_age from "./assets/images/icon-age.svg"
import img_muscle from "./assets/images/icon-muscle.svg"
import img_pregnancy from "./assets/images/icon-pregnancy.svg"
import img_race from "./assets/images/icon-race.svg"

import { useState, useReducer } from "react"

function RenderResults(iResult, idealWeight) {
	let sEvaluation;

	if (iResult < 18.5) {
			sEvaluation = "underweight"
	}
	else if(iResult > 24.9) {
		sEvaluation = "overweight"
	}
	else {
		sEvaluation = "a healthy weight"
	}

	if (!iResult) {
		return <>
			<div className="result">
				<div>
					<h3 className="heading-3 | clr-neutral-000">Welcome!</h3>
					<p className="margin-block-start-4">Enter your height and weight and you’ll see your BMI result here</p>
				</div>
			</div>
		</>
	} else {
		return <>
			<div className="result" data-type="even-column">
				<div>
					<h3 className="clr-neutral-000 fw-semibold fs-400">Your BMI is...</h3>
					<p className="heading-1 | clr-neutral-000 margin-block-start-2">{iResult}</p>
				</div>
				<p style={{ alignSelf: "center" }} className="clr-neutral-000">Your BMI suggests you’re {sEvaluation}. Your ideal weight is between <span className="fw-semibold">{idealWeight}.</span></p>
			</div>
		</>
	}
}

function BMICalculator(unit) {
	
	const [bmi, dispatchBMI] = useReducer(function (state, action) {
		let heightCm= state.heightCm,
				weightKg= state.weightKg,

				heightFt= state.heightFt,
				heightIn= state.heightIn,
				weightSt= state.weightSt,
				weightLb= state.weightLb,
				result= state.result;

		switch (action.type) {
			case "changeHeight":
				if (action.payload <= 0) {
					heightCm = "";
					heightFt = "";
					heightIn = "";
				} else {
					heightCm = Math.round(action.payload);
					heightFt = Math.floor(action.payload / 30.479999999999993);
					heightIn = Math.round(action.payload % 30.479999999999993 / 2.54);
				}
				break;
			case "changeWeight":
				if (action.payload <= 0) {
					weightKg = "";
					weightSt = "";
					weightLb = "";
				} else {
					weightKg = Math.round(action.payload);
					weightSt = Math.floor(action.payload / 6.3503);
					weightLb = Math.round(action.payload % 6.35 * 2.20462);
				}
				break;
			default:
				break;
		}

		if (weightLb <= 0) {
			weightLb = "";
		}
		if (heightIn <= 0) {
			heightIn = "";
		}

		if (weightKg > 0 && heightCm > 0) {
			result = parseFloat((weightKg / (heightCm / 100) ** 2).toFixed(2));
		} else {
			result = null;
		}

		return {
			heightCm,
			weightKg,

			heightFt,
			heightIn,
			weightSt,
			weightLb,
			result,
		};
	}, {
		heightCm: "",
		weightKg: "",

		heightFt: "",
		heightIn: "",
		weightSt: "",
		weightLb: "",
		result: 0,
		idealWeightRange: "",
	})

	function calculateWeightRange(height) {
    let minWeight, maxWeight;

    if (unit === 'metric') {
      minWeight = (18.5 * (height / 100) ** 2).toFixed(1) + "kg";
      maxWeight = (24.9 * (height / 100) ** 2).toFixed(1) + "kg";
    } else {
      minWeight = (18.5 * (height / 100) ** 2).toFixed(1);
			minWeight = `${Math.floor(minWeight / 6.3503)}st ${Math.round(minWeight % 6.35 * 2.20462)}lb`

      maxWeight = (24.9 * (height / 100) ** 2).toFixed(1);
			maxWeight = `${Math.floor(maxWeight / 6.3503)}st ${Math.round(maxWeight % 6.35 * 2.20462)}lb`
    }

    return `${minWeight} - ${maxWeight}`;
  }

	if (unit === "metric") {
		return <>
			<div className="input-group" data-unit="cm">
				<label className="fw-regular" htmlFor="height">Height</label>
				<input name="height" type="number" placeholder="0" value={bmi.heightCm} onChange={(e) => dispatchBMI({ type:"changeHeight", payload: e.target.value})}/>
			</div>

			<div className="input-group" data-unit="kg">
				<label className="fw-regular" htmlFor="weight">Weight</label>
				<input name="weight" type="number" placeholder="0" value={bmi.weightKg} onChange={(e) => dispatchBMI({ type:"changeWeight", payload: e.target.value})}/>
			</div>
			
			{RenderResults(bmi.result, calculateWeightRange(bmi.heightCm))}
		</>
	} else if (unit === "imperial"){
		return <>
			<div className="input-group" data-unit="ft">
				<label className="fw-regular" htmlFor="height">Height</label>
				<input name="height" type="number" placeholder="0" 
					value={bmi.heightFt} onChange={e => dispatchBMI({ type:"changeHeight", payload: e.target.value * 30.479999999999993 + bmi.heightIn * 2.54 })} />
			</div>

			<div className="input-group" data-unit="in">
				<input name="height" type="number" placeholder="0" 
					value={bmi.heightIn} onChange={e => dispatchBMI({ type:"changeHeight", payload: e.target.value * 2.54 + bmi.heightFt * 30.479999999999993})}/>
			</div>

			<div className="input-group" data-unit="st">
				<label className="fw-regular" htmlFor="weight">Weight</label>
				<input name="weight" type="number" placeholder="0" 
					value={bmi.weightSt} 
					onChange={e => dispatchBMI({ type:"changeWeight", payload: e.target.value * 6.3503 + bmi.weightLb * 2.20462})} />
			</div>

			<div className="input-group" data-unit="lbs">
				<input name="weight" type="number" placeholder="0"
					value={bmi.weightLb}
					onChange={e => dispatchBMI({ type:"changeWeight", payload: e.target.value / 2.20462 + bmi.weightSt * 6.3503})} />
			</div>
			
			{RenderResults(bmi.result, calculateWeightRange(bmi.heightCm))}
		</>
	}
}


function App() {
	const [unit, setUnit] = useState("metric")

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
							<div className="form-group" data-type={unit}>
								<div className="radio-group">
									<input id="metric" name="radio" type="radio" checked={unit === "metric"} onChange={() => setUnit("metric")} />
									<label className="clr-neutral-800 fs-400" htmlFor="metric">Metric</label>
								</div>

								<div className="radio-group">
									<input id="imperial" name="radio" type="radio" checked={unit === "imperial"} onChange={() => setUnit("imperial")} />
									<label className="clr-neutral-800 fs-400" htmlFor="imperial">Imperial</label>
								</div>

								{BMICalculator(unit)}
							</div>
						</div>
					</main>
				</div>
			</section>

			<section className="image-section">
				<div className="image-section__container">
					<img className="image-curve-left" src={img_line_left} alt="Line curved to the left" />

				<div className="image-section__grid">
					<div className="image-section__image">
						<img src={img_eatingMan} alt="A healthy looking smiling man in a white shirt holding a sushi roll with a pair of chopsticks" />
					</div>

					<div className="image-section__description">
						<h2 className="heading-2">What your BMI result means</h2>
						<p className="margin-block-start-8">A BMI range of 18.5 to 24.9 is considered a &apos;healthy weight.&apos; Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.</p>
					</div>
				</div>

				</div>
			</section>

			<section className="advice-section">
				<div className="advice-section__container" data-type="full-bleed">
					
					<div className="even-columns" style={{"--grid-gap": "2.5rem", "--flex-row-gap": "2.5rem", "--flex-column-gap": "2.5rem"}}>

						<div className="flex-group">
							<img src={img_eating} alt="A bowl with food" />

							<div>
								<h3 className="heading-3">Healthy eating</h3>
								<p className="margin-block-start-6">Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.</p>
							</div>
						</div>

						<div className="flex-group">
							<img src={img_exercise} alt="A dumbbell" />

							<div>
								<h3 className="heading-3">Regular exercise</h3>
								<p className="margin-block-start-6">Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.</p>
							</div>
						</div>

						<div className="flex-group">
							<img src={img_sleep} alt="A half moon with stars" />

							<div>
								<h3 className="heading-3">Adequate sleep</h3>
								<p className="margin-block-start-6">Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.</p>
							</div>
						</div>
						
					</div>

				</div>
			</section>

			<section className="section">
				<div className="container">
					<div className="last-flex-group test">

						<div className="text">
							<h2 className="heading-2">Limitations of BMI</h2>
							<p className="margin-block-start-7">Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.</p>
						</div>

						<div className="card">
							<div className="card__icon-header">
								<img src={img_gender} alt="A Sign portraing both genders" />
								<h4 className="card__heading">Gender</h4>
							</div>
							<p>The development and body fat composition of girls and boys vary with age. Consequently, a child&apos;s age and gender are considered when evaluating their BMI.</p>
						</div>

						<div className="image__container">
							<img src={img_line_right} alt="A line curved to the left" />
						</div>

						<div className="card">
							<div className="card__icon-header">
								<img src={img_age} alt="A picture of a cake" />
								<h4 className="card__heading">Age</h4>
							</div>
							<p>In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content.</p>
						</div>

						<div className="card">
							<div className="card__icon-header">
								<img src={img_muscle} alt="A picture of a flexed biceps" />
								<h4 className="card__heading">Muscle</h4>
							</div>
							<p>BMI may misclassify muscular individuals as overweight or obese, as it doesn&apos;t differentiate muscle from fat.</p>
						</div>

						<div className="card">
							<div className="card__icon-header">
								<img src={img_pregnancy} alt="A portrait of a baby" />
								<h4 className="card__heading">Pregnancy</h4>
							</div>
							<p>Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child.</p>
						</div>

						<div className="card">
							<div className="card__icon-header">
								<img src={img_race} alt="A picture of a human" />
								<h4 className="card__heading">Race</h4>
							</div>
							<p>Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse.</p>
						</div>

					</div>
				</div>
			</section>
		</>
  )
}

export default App
