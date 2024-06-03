import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome to the Examination Portal</h1>
        <p className="text-base md:text-lg mb-6">Please read the following instructions carefully before proceeding:</p>
        <div className="text-left mb-6">
          <ol className="list-decimal list-inside text-sm md:text-base">
            <li>Your username is your email address, and your password is your SURNAME or FIRST NAME in lowercase letters. For example, if your surname is <small className='font-bold text-base'>"Obafemi&quot;</small> your password will be <small className='font-bold text-base'>"Obafemi&quot;</small></li>
            <li>If you entered the details correctly and you get an error message saying <small className='font-bold text-base'>"wrong credientials&quot;</small> try using your LAST NAME as your password (in lowercase letters). For example, "Obafemi Awolowo" should try <small className='font-bold text-base'>"awolo,&quot;</small>  if <small className='font-bold text-base'>"Obafemi,&quot;</small>  does not work.</li>
            <li>The duration of the examination is 48 minutes. It is advisable to spend a maximum of one minute on each question to ensure you finish before the time runs out.</li>
            <li>Once you are logged in, you will not be allowed to take the exam again. So, make sure to finish the exam once you log in.</li>
            <li>There are four sections in total, and you must answer all the questions in each section.</li>
            <li>The questions are multiple-choice and are based on the following courses:
              <ul className="list-disc list-inside">
                <li>Basic Bible Doctrine</li>
                <li>Hermeneutics</li>
                <li>The Call of God</li>
                <li>Ministry Gifts</li>
              </ul>
            </li>
            <li>Each question carries 5 marks, 12 questions per section and each section totals 60 marks.</li>
            <li>There is a negative marking structure in place. For every question you miss, one mark is deducted from your total accumulated marks.</li>
            <li>Once you finish the exam, you can either click the submit button or wait for your time to lapse. In this case, the system will automatically submit for you.</li>
            <li>At the end of the test, you will see your score instantly.</li>
            <li>Every question you missed will be listed upon submission, along with their correct answers.</li>
          </ol>
        </div>
        <Link href="/login">
          <p className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition duration-300 text-sm md:text-base">Start Exam</p>
        </Link>
      </div>
    </main>
  );
}
