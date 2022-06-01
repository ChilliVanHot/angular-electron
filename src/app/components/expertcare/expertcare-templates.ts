export const templates = {

    expertcareMedicineChange:
`
<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>ExpertCare Medicine Change Request</title>
	<base href="./">
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<style>
	.box {
		border-style: solid;
		border-color: #999999;
		border-width: 1px;
	}

	body,
	p,
	div,
	span,
	table,
	tr,
	td {
		font-family: Verdana;
		font-size: 12px;
		color: #333333;
	}

	p {
		margin: 7px;
	}

	td {
		padding-left: 5px;
		padding-right: 5px;
	}
</style>
<body>
	<table cellspacing="0" cellpadding="0" width="100%">
		<tbody>
			<!-- <tr>
            <td width="35%" colspan="6" valign="top">
                <p style="color:lightgreen">
                    [todays date]
                </p>
            </td>
            <td width="39%" colspan="5" valign="top">
                <p>
                    ExpertCare Pathway [version number]
                </p>
            </td>
            <td width="24%" colspan="3" valign="top">
            </td>
        </tr> -->
			<tr>
				<td width="100%">
					<table class="box" cellspacing="0" cellpadding="0" width="100%">
						<tr>
							<td width="75%" colspan="11" valign="top">
								<table border="0" cellspacing="0" cellpadding="0">
									<tbody>
										<tr>
											<td>
												<p align="left">
													Access to this application and any information it contains is limited to authorized users only. Legal action can be taken against unauthorised use of, or unauthorised access to this application and/or any information it may contain, including pursuant to Computer Misuse Act 1990. If you are an authorised user, by proceeding to access and use this application and / or the information it contains, you are accepting ant terms of use, notices and policies which are contained or referenced within it or which have otherwise been drawn to your attention as an authorised user.
												</p>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
							<td width="24%" colspan="3" valign="top">
								<table border="0" cellspacing="0" cellpadding="0">
									<tbody>
										<tr>
											<td valign="top">
												<p>
													<strong style="color:red">Official-Sensitive Data</strong>
												</p>
												<p>
													{{ dateTime }}
												</p>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td width="100%">
					<table class="box" cellspacing="0" cellpadding="0" width="100%">
						<tr>
							<td width="11%" valign="top">
								<p>
									<strong>DATE:</strong>
								</p>
							</td>
							<td width="34%" colspan="6" valign="top">
								<p>
									{{ dateTime }}
								</p>
							</td>
							<td width="11%" valign="top">
								<p>
									<strong>CODE SYSTEM:</strong>
								</p>
							</td>
							<td width="34%" colspan="6" valign="top">
								<p>
									SNOMED
								</p>
							</td>
							<td width="11%" valign="top">
								<p>
									<strong>CODE:</strong>
								</p>
							</td>
							<td width="18%" colspan="3" valign="top">
								<p>
									473225006
								</p>
							</td>
							<td width="24%" colspan="3" valign="top">
							</td>
						</tr>
						<tr>
							<td width="11%" valign="top">
								<p>
									<strong>Description:</strong>
								</p>
							</td>
							<td width="34%" colspan="6" valign="top">
								<p>
									Hypertension medication review 
								</p>
							</td>
							<td width="11%" valign="top">
							</td>
							<td width="18%" colspan="3" valign="top">
							</td>
							<td width="24%" colspan="3" valign="top">
							</td>
						</tr>
						<tr>
							<td width="11%" valign="top">
								<p>
									<strong>USER:</strong>
								</p>
							</td>
							<td width="34%" colspan="6" valign="top">
								<p>
									{{ practitioner.fullName }}
								</p>
							</td>
							<td width="11%" valign="top">
								<p>
									<strong>Role:</strong>
								</p>
							</td>
							<td width="18%" colspan="3" valign="top">
								<p>
									{{ practitioner.role }}
								</p>
							</td>
							<td width="24%" colspan="3" valign="top">
							</td>
						</tr>
						<tr>
							<td width="11%" valign="top">
								<p>
									<strong>PATIENT:</strong>
								</p>
							</td>
							<td width="34%" colspan="6" valign="top">
								<p>
									{{ patient.callingName }} {{ patient.familyName }}
								</p>
							</td>
							<td width="11%" valign="top">
								<p>
									<strong>NHS No:</strong>
								</p>
							</td>
							<td width="18%" colspan="3" valign="top">
								<p>
									{{ patient.nhsNumber }}
								</p>
							</td>
							<td width="24%" colspan="3" valign="top"></td>
						</tr>
						<tr>
							<td width="11%" valign="top"></td>
							<td width="34%" colspan="6" valign="top"></td>
							<td width="11%" valign="top"></td>
							<td width="18%" colspan="3" valign="top"></td>
							<td width="24%" colspan="3" valign="top"></td>
						</tr>
						<tr>
							<td width="11%" valign="top">
								<p>
									<strong>STATUS:</strong>
								</p>
							</td>
							<td nowrap width="17%" colspan="3" valign="top">
								<p>
									{{ patient.bpType }}
								</p>
							</td>

							<td nowrap width="7%" valign="top">
								<p>
									{{ patient.bpValue }}
								</p>
							</td>
							<td nowrap width="23%" colspan="4" valign="top">
								<p>
									{{ patient.bpDate }}
								</p>
							</td>
							<td nowrap width="8%" valign="top">
								<p>
									{{ patient.gender }}
								</p>
							</td>
							<td nowrap width="18%" colspan="2" valign="top">
								<p>
									{{ patient.ethnicity }}
								</p>
							</td>
							<td nowrap width="13%" colspan="2" valign="top">
								<p>
									{{ patient.age }}
								</p>
							</td>
						</tr>
						<tr>
							<td width="28%" colspan="4" valign="top">
							</td>
							<td width="71%" colspan="10" valign="top">
							</td>
						</tr>

						{% if excludedCPs|length %}
						<tr>
							<td width="28%" colspan="4" valign="top">
								<p>
									<b>Excluded Comorbidity:</b>
								</p>
							</td>
							<td width="71%" colspan="10" valign="top">
								<p>
									<b>Reasons for previous exclusion from decision process:</b>
								</p>
							</td>
						</tr>
						{% endif %}

						{% for key, value in excludedCPs %}
						<tr>
							<td width="28%" colspan="4" valign="top">
								<p>
									{{ value.CPName }}
								</p>
							</td>
							<td width="71%" colspan="10" valign="top">
								<p>
									NOT RECEIVED
								</p>
							</td>
						</tr>
						{% endfor %}

						{% if activeCPs|length %}
						<tr>
							<td width="28%" colspan="4" valign="top">
								<p>
									<b>Relevant Comorbidity:</b>
								</p>
							</td>
							<td width="71%" colspan="10" valign="top">
								<p>
									<b>Remarks:</b>
								</p>
							</td>
						</tr>
						{% endif %}

						{% for key, value in activeCPs %}
						<tr>
							<td width="28%" colspan="4" valign="top">
								<p>
									{{ value.CPName }}
								</p>
							</td>
							<td width="71%" colspan="10" valign="top">
								<p>
									{{ value.lastDate }}
								</p>
							</td>
						</tr>
						{% endfor %}

						<tr>
							<td width="28%" colspan="4" valign="top">
							</td>
							<td width="71%" colspan="10" valign="top">
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
			<tr>
				<td width="100%">
					<table class="box" cellspacing="0" cellpadding="0" width="100%">

						<tr style="background-color:#585858">

							<td width="100%" valign="top">
								<p align="left" style="color:#ffffff"><strong>General Recommendations</strong></p>
							</td>

						</tr>
						<tr>
							<td width="81%" c valign="top">
								<p align="left">
									[NICE general recommendation]
								</p>
							</td>
						</tr>
						<tr>
							<td width="81%" valign="top">
								<p align="left">
									Drug Interactions
								</p>
							</td>
						</tr>
						<tr>
							<td width="81%" valign="top">
								<p align="left">
									[recommendations]
								</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td width="100%">
					<table class="box" cellspacing="0" cellpadding="0" width="100%">

						<tr style="background-color:#e1e8e8">
							<td width="14%" cvalign="top">
								<p>
									<strong>Drug</strong>
								</p>
							</td>
							<td width="55%" colspan="2" valign="top">
								<p align="left">
									<strong>Information</strong>
								</p>
							</td>
							<td width="31%" valign="top">
								<p>
									<strong>Recommendation</strong>
								</p>
							</td>

						</tr>
						<tr style="background-color:#585858">

							<td width="100%" colspan="5" valign="top">
								<p align="left" style="color:#ffffff"><strong>Current Medication</strong></p>
							</td>

						</tr>
						<tr style="background-color:#02b18b">
							<td width="100%" colspan="5" valign="top">
								<p align="left" style="color:#ffffff">
									Medication to be Actioned
								</p>
							</td>

						</tr>
						{% if data.PrescribingRecommendations.MedsForAction.MedList.length != 0 %}
						{% for medsForAction in data.PrescribingRecommendations.MedsForAction.MedList %}
						<tr>
							<td width="14%" valign="top">
								<p>
									{{ medsForAction.drugClass }}<br />
									<strong>{{ medsForAction.drugName }}</strong><br />
									{{ medsForAction.decisionPlainTxt }}
								</p>
							</td>

							<td colspan="2" width="57%" valign="top">
								<table width="100%" valign="top">
									{% for drugInfo in medsForAction.DrugInfo %}
									<tr>
										<td width="40%" valign="top">{{ drugInfo.type }}</td>
										<td width="60%" valign="top">{{ drugInfo.items }}</td>
									</tr>
									{% endfor %}
								</table>
							</td>

							<td width="31%" valign="top">
								<p>
									{{ medsForAction.recommendationTxt }}
								</p>
							</td>
						</tr>
						{% endfor %}
						{% endif %}

						{% if data.PrescribingRecommendations.MedsForAction.MedList.length === 0 %}
						<tr>
							<td width="100%" colspan="4">
								<p>None</p>
							</td>
						</tr>
						{% endif %}

						<tr style="background-color:#02b18b">
							<td width="100%" colspan="15" valign="top">
								<p align="left" style="color:#ffffff">Continued Medication</p>
							</td>
						</tr>

						{% for continuedMeds in data.PrescribingRecommendations.ContinuedMeds.MedList %}
						<tr>
							<td width="14%" valign="top">
								<p>
									{{ continuedMeds.drugClass }}<br />
									<strong>{{ continuedMeds.drugName }}</strong><br />
									{{ continuedMeds.decisionPlainTxt }}
								</p>
							</td>

							<td colspan="2" width="57%" valign="top">
								<table width="100%" valign="top">
									{% for drugInfo in continuedMeds.DrugInfo %}
									<tr>
										<td width="40%" valign="top">{{ drugInfo.type }}</td>
										<td width="60%" valign="top">{{ drugInfo.items | safe }}</td>
									</tr>
									{% endfor %}
								</table>
							</td>

							<td width="31%" valign="top">
								<p>
									{{ continuedMeds.recommendationTxt }}
								</p>
							</td>
						</tr>
						{% endfor %}

						<tr style="background-color:#02b18b">
							<td width="100%" colspan="5" valign="top">
								<p align="left" style="color:#ffffff">Started Medication</p>
							</td>
						</tr>

						{% for startedMeds in data.PrescribingRecommendations.StartedMeds.MedList %}
						<tr>
							<td width="14%" valign="top">
								<p>
									{{ startedMeds.drugClass }}<br />
									<strong>{{ startedMeds.drugName }}</strong><br />
									{{ startedMeds.decisionPlainTxt }}
								</p>
							</td>

							<td colspan="2" width="57%" valign="top">
								<table width="100%" valign="top">
									{% for drugInfo in startedMeds.DrugInfo %}
									<tr>
										<td width="40%" valign="top">{{ drugInfo.type }}</td>
										<td width="60%" valign="top">{{ drugInfo.items | safe }}</td>
									</tr>
									{% endfor %}
								</table>
							</td>

							<td width="31%" valign="top">
								<p>
									{{ startedMeds.recommendationTxt }}
								</p>
							</td>
						</tr>
						{% endfor %}

						<tr style="background-color:#585858">
							<td width="100%" colspan="5" valign="top">
								<p align="left" style="color:#ffffff">Stopped Medication</p>
							</td>
						</tr>

						{% for stopMed in data.PrescribingRecommendations.StopMeds.MedList %}
						<tr>
							<td width="14%" valign="top">
								<p>
									{{ stopMed.drugClass }}<br />
									<strong>{{ stopMed.drugName }}</strong><br />
									{{ stopMed.decisionPlainTxt }}
								</p>
							</td>

							<td width="25%" valign="top">
								<p align="left"></p>
							</td>
							<td width="32%" valign="top">
								<p></p>
							</td>
							<td width="31%" valign="top">
								<p></p>
							</td>
						</tr>
						{% endfor %}
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</body>
</html>
`


}
