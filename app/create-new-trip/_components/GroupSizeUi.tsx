export const SelectTravelesList = [
  {
    id: 1,

    title: "Just Me",

    desc: "A sole traveles in exploration",

    icon: "✈️",

    people: "1",
  },

  {
    id: 2,

    title: "A Couple",

    desc: "Two traveles in tandem",

    icon: "🥂",

    people: "2 People",
  },

  {
    id: 3,

    title: "Family",

    desc: "A group of fun loving adv",

    icon: "🏡",

    people: "3 to 5 People",
  },

  {
    id: 4,

    title: "Friends",

    desc: "A bunch of thrill-seekes",

    icon: "⛵",

    people: "5 to 10 People",
  },
];

function GroupSizeUi({onSelectedOption}:any) {
  return (
    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
      {SelectTravelesList.map((item, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg mb-4 cursor-pointer hover:bg-primary hover:text-white transition-all"
        onClick={()=>{onSelectedOption(item.title+":"+item.people)}}
        >
          <h2>{item.icon}</h2>
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default GroupSizeUi;
