<input
type="text"
placeholder="Type Username"
onKeyDown={searchEnter}
/>
{
userRepo.length!==0 ?
  userRepo.map((repo) => {
    return(
      <SingleRepo 
        repo={repo}
      />
    );
}) : null
}