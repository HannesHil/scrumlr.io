import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {Timer} from "components/Timer";
import {VoteDisplay} from "components/Votes/VoteDisplay";
import ReactDOM from "react-dom";
import _ from "underscore";
import {useAppSelector} from "store";
import {TooltipButton} from "components/TooltipButton/TooltipButton";
import {ReactComponent as ShareIcon} from "assets/icon-share.svg";
import "./Infobar.scss";
import {UserAvatar} from "components/BoardUsers";

const HighlightedParticipant = (props: {participantId?: string}) => {
  const participant = useAppSelector((state) => [...state.participants!.others, state.participants!.self].find((participant) => participant.user.id === props.participantId));

  if (!participant) {
    return null;
  }

  return (
    <figure className="info-bar__highlighted-participant">
      <UserAvatar id={participant.user.id} avatar={participant.user.avatar} name={participant.user.name} />
      <figcaption className="note__author-name">{participant.user.name}</figcaption>
    </figure>
  );
};

export const InfoBar = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const viewer = useAppSelector((state) => state.participants!.self);
  const focusInitiator = useAppSelector((state) => state.participants?.focusInitiator);

  const state = useAppSelector(
    (applicationState) => ({
      endTime: applicationState.board.data?.timerEnd,
      activeVoting: Boolean(applicationState.votings.open),
      possibleVotes: applicationState.votings.open?.voteLimit,
      usedVotes: applicationState.votes.filter((v) => v.voting === applicationState.votings.open?.id).length,
      sharedNote: applicationState.board.data?.sharedNote,
      highlightedParticipant: applicationState.board.data?.highlightedParticipant,
    }),
    _.isEqual
  );

  console.log(state.highlightedParticipant);

  return ReactDOM.createPortal(
    <aside className="info-bar">
      <HighlightedParticipant participantId={state.highlightedParticipant} />
      {state.endTime && <Timer endTime={state.endTime} />}
      {state.activeVoting && <VoteDisplay usedVotes={state.usedVotes} possibleVotes={state.possibleVotes!} />}
      {state.sharedNote && viewer.user.id !== focusInitiator?.user.id && (
        <TooltipButton
          className="info-bar__return-to-presented-note-button"
          icon={ShareIcon}
          direction="right"
          label={t("InfoBar.ReturnToPresentedNote")}
          onClick={() => navigate(`note/${state.sharedNote}/stack`)}
        />
      )}
    </aside>,
    document.getElementById("root")!
  );
};
