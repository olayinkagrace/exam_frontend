import Link from "next/link";
import logo from "../../public/logo.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col justify-center items-center px-6 py-12"
      style={{
        backgroundImage: "url('/som_5.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // Ensure the image doesn't repeat
        backgroundAttachment: "fixed", // Optional: makes the background stay fixed while scrolling
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 md:p-10 rounded-2xl shadow-2xl text-center max-w-xl w-full transform transition-all duration-500 hover:scale-105">
        <div className="flex justify-center mb-6">
          <Image
            src={logo}
            width={80}
            height={60}
            alt="logo"
            className="rounded-full shadow-lg transition transform hover:rotate-12 duration-500"
          />
        </div>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 text-gray-900 drop-shadow-md">
          Welcome to the Examination Portal
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-8 font-medium">
          Please read the following instructions carefully before proceeding:
        </p>
        <div className="text-left mb-8 text-gray-800">
          <ol className="list-decimal list-inside space-y-4">
            <li>
              Your password is{" "}
              <span className="font-bold text-red-600 text-base">faith</span>.
            </li>
            <li>
              The duration of the examination is 48 minutes. It is advisable to
              spend a maximum of one minute on each question to ensure you
              finish before the time runs out.
            </li>
            <li>
              Once you are logged in, you will not be allowed to take the exam
              again. So, make sure to finish the exam once you log in.
            </li>
            <li>
              There are four sections in total, and you must answer all the
              questions in each section.
            </li>
            <li>
              The questions are multiple-choice and are based on the following
              courses:
              <ul className="list-disc list-inside pl-5 mt-2 space-y-1">
                <li>Pastoral Ministry</li>
                <li>Great Commission</li>
                <li>Homiletics</li>
                <li>Church Pioneering and Church Dynamics</li>
                <li>The Doctrine of Prayer</li>
              </ul>
            </li>
            <li>
              Each question carries 5 marks, with 12 questions per section, and
              each section totals 60 marks.
            </li>
            <li>
              There is a negative marking structure in place. For every question
              you miss, one mark is deducted from your total accumulated marks.
            </li>
            <li className="font-bold text-red-600">
              Make sure to click on the submit button on the last question
              before the time lapses. Failure to do this will result in no score
              for the test.
            </li>
            <li>At the end of the test, you will see your score instantly.</li>
            <li>
              Every question you missed will be listed upon submission, along
              with their correct answers.
            </li>
          </ol>
        </div>
        <Link href="/login" legacyBehavior>
          <a className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-full font-semibold hover:from-green-500 hover:to-green-600 transition duration-300 text-base md:text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Exam
          </a>
        </Link>
      </div>
    </main>
  );
}
