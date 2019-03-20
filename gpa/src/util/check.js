const getGPA = (data = null) => {
  try {
    // 35 – 39 F 2
    // 40‐49 E 2.5
    // 50‐59 D 3
    // 60‐69 C 3.5
    // 70‐79 B 4
    // 80‐100 A and A+ 5

    let classtwlve =
      parseInt(data.Physics) +
      parseInt(data.Biology) +
      parseInt(data.Chemistry);
    let classTenth =
      parseInt(data.Subject1Marks) +
      parseInt(data.Subject2Marks) +
      parseInt(data.Subject3Marks) +
      parseInt(data.Subject4Marks) +
      parseInt(data.Subject5Marks);

    if (
      parseInt(data.Subject1Marks) <= parseInt(data.SubjectTotal1Marks) &&
      parseInt(data.Subject2Marks) <= parseInt(data.SubjectTotal2Marks) &&
      parseInt(data.Subject3Marks) <= parseInt(data.SubjectTotal3Marks) &&
      parseInt(data.Subject4Marks) <= parseInt(data.SubjectTotal4Marks) &&
      parseInt(data.Subject5Marks) <= parseInt(data.SubjectTotal5Marks) &&
      parseInt(data.Biology) <= parseInt(data.BiologyTotal) &&
      parseInt(data.Physics) <= parseInt(data.PhysicsTotal) &&
      parseInt(data.Chemistry) <= parseInt(data.ChemistryTotal)
    ) {
      let gpa = classtwlve / 3 + classTenth / 5;
      let bioScor = data.Biology;
      if (classtwlve / 3 >= 3.5 && bioScor >= 3.5 && gpa >= 7) return gpa;
      else return "false";
    } else return false;
    console.log(data.Physics, classtwlve / 3 + classTenth / 5);
  } catch (e) {
    console.log(e);
  }
};

export default getGPA;
