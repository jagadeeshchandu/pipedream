import common from "../common/base.mjs";

export default {
  ...common,
  key: "planview_leankit-card-entered-a-lane",
  name: "New Card Entered a Specific Lane",
  description: "Emit new event when a card enters a specific lane.",
  type: "source",
  version: "0.0.1",
  dedupe: "unique",
  props: {
    ...common.props,
    laneId: {
      propDefinition: [
        common.props.planview_leankit,
        "laneId",
        ({ boardId }) => ({
          boardId,
        }),
      ],
    },
  },
  methods: {
    ...common.methods,
    getFunc() {
      return this.planview_leankit.listActivity;
    },
    validate(d) {
      return d.data?.type === "cardMoved" && (d.data?.toLane?.id === this.laneId);
    },
    getSummary(data) {
      return `Card ${data.data.card.title} entered the lane ${this.laneId}`;
    },
  },
};