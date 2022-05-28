using Domain.Entities;
using System.Text;

namespace WebAPI.Utility
{
    public class TemplateGenerator
    {
        public static string GetHTMLString(WorkoutProgram program)
        {
            var sb = new StringBuilder();
            sb.AppendFormat(@"
                        <html>
                            <head>
                            </head>
                            <body>
                                <div class='header'><h2>{0}</h2></div>", program.Name);
            foreach (var workout in program.Workouts)
            {
                if (workout.Exercises.Count > 0)
                {
                    sb.AppendFormat(@"
                            <div><h4>{0}<h4>", workout.Name);
                    sb.Append(@"
                                <table align='center'>
                                    <tr>
                                        <th width='42%'>Name</th>
                                        <th width='16%'>Sets</th>
                                        <th width='20%'>Reps</th>
                                        <th width='22%'>Rest (seconds)</th>
                                    </tr>");
                    foreach (var exercise in workout.Exercises)
                    {
                        sb.AppendFormat(@"<tr>
                                    <td>{0}</td>
                                    <td>{1}</td>
                                    <td>{2}</td>
                                    <td>{3}</td>
                                  </tr>", exercise.Name, exercise.Sets, exercise.Reps, exercise.Rest);
                    }
                    sb.Append(@"
                                </table></div>");
                }
            }
            foreach (var workout in program.Workouts)
            {
                foreach (var exercise in workout.Exercises)
                {
                    if (exercise.Description != null && exercise.Description != "")
                    {
                        sb.AppendFormat(@"<p>{0} - {1}</p>", exercise.Name, exercise.Description);
                    }
                }
            }
            sb.Append(@"
                            </body>
                        </html>");
            return sb.ToString();
        }
    }
}
